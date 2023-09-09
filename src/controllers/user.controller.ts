import { Request, Response } from 'express';

import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import Role from '../models/role.model';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find()
			.select('-password -createdAt -updatedAt -__v')
			.populate('role', 'name')
			.lean();

		return res.json({
			ok: true,
			users,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id)
			.select('-password -createdAt -updatedAt -__v')
			.populate('role', 'name')
			.lean();

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const user = await User.create(req.body);

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const updateStateUser = async (req: Request, res: Response) => {
	const { state } = req.body as IUser;
	const { id } = req.params;

	try {
		const user = await User.findByIdAndUpdate(id, { state: state }, { new: true })
			.select('-password -createdAt -updatedAt -__v')
			.lean();

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const updateProfileUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { password, ...updateBody } = req.body as IUser;
	let user;

	try {
		user = await User.findById(id)
			.select('-password -createdAt -updatedAt -__v')
			.populate('role', 'name');

		if (password && password !== '') {
			if (password && password !== '') {
				user!.password = password;
			}

			await user?.save();
		} else {
			user = await User.findByIdAndUpdate(id, updateBody, { new: true })
				.select('-password -createdAt -updatedAt -__v')
				.populate('role', 'name')
				.lean();
		}

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { password, ...updateBody } = req.body as IUser;
	let user;

	try {
		user = await User.findById(id).select('-password -createdAt -updatedAt -__v');

		if (password && password !== '') {
			if (password && password !== '') {
				user!.password = password;
			}

			await user?.save();
		} else {
			user = await User.findByIdAndUpdate(id, updateBody, { new: true })
				.select('-password -createdAt -updatedAt -__v')
				.lean();
		}

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await User.findByIdAndUpdate(id, { state: false });

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ ok: false, message: 'Error interno del servidor' });
	}
};
