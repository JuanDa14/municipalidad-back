import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { generateJWT } from '../helpers';

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const userInDB = await User.findOne({ email, state: true })
			.select('+password')
			.populate('role', 'name')
			.lean();

		if (!userInDB) {
			return res.status(404).json({ message: 'Credenciales incorrectas' });
		}

		const isMatch = bcrypt.compareSync(password, userInDB.password!);

		if (!isMatch) {
			return res.status(401).json({ message: 'Credenciales incorrectas' });
		}

		const accessToken = await generateJWT(userInDB._id, 'access-token');
		const refreshToken = await generateJWT(userInDB._id, 'refresh-token');

		const { password: _, ...user } = userInDB;

		return res.json({ user, accessToken, refreshToken });
	} catch (error) {
		return res.status(500).json({ message: 'Error interno del servidor' });
	}
};

export const refreshTokenUser = async (req: Request, res: Response) => {
	const id = req.id;
	try {
		const user = await User.findOne({ _id: id, state: true })
			.select('-createdAt -updatedAt -__v')
			.populate('role', 'name');

		if (!user) throw new Error('El usuario no se encuentra registrado');

		const accessToken = await generateJWT(user._id, 'access-token');
		const refreshToken = await generateJWT(user._id, 'refresh-token');

		return res.json({
			ok: true,
			accessToken,
			refreshToken,
			user,
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		}
	}
};
