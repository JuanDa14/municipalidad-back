import { check } from 'express-validator';

import { User } from '../models';
import { isNotExistRoleById } from './role.middleware';
import { validateFields } from './field.middleware';

export const isExistUserByEmail = async (email: string) => {
	const user = await User.findOne({ email }).select('+_id').lean();

	if (user) {
		throw new Error(`El usuario ya está registrado`);
	}
};

const IsNotExistUserById = async (id: string) => {
	const user = await User.findById(id).select('+_id').lean();

	if (!user) {
		throw new Error('El usuario no existe');
	}
};

export const createUserValidator = [
	check('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
	check('email', 'El correo es requerido').trim().isEmail(),
	check('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
	check('address').trim().not().isEmpty(),
	check('state').trim().not().isEmpty().isBoolean(),
	check('email').custom(isExistUserByEmail),
	check('role', 'El rol es requerido').trim().not().isEmpty().isMongoId(),
	check('role').custom(isNotExistRoleById),
	validateFields,
];

export const getUserValidator = [
	check('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
	check('id').custom(IsNotExistUserById),
	validateFields,
];
