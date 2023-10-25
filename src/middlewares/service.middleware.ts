import { check } from 'express-validator';

import { Service } from '../models';
import { validateFields } from './field.middleware';

export const isExistService = async (name: string) => {
	const nameUppercase = name.toUpperCase();

	const service = await Service.findOne({ name: nameUppercase }).select('+_id').lean();

	if (service) {
		throw new Error(`Ya existe un servicio con el nombre ${name}`);
	}
};

export const isNotExistServiceById = async (id: string) => {
	const service = await Service.findById(id).select('+_id').lean();

	if (!service) {
		throw new Error('No existe el servicio');
	}
};

export const createServiceValidator = [
	check('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
	check('type', 'El tipo es requerido').trim().not().isEmpty().isMongoId(),
	check('price', 'El tipo es requerido').trim().not().isEmpty().isNumeric(),
	check('name').custom(isExistService),
	validateFields,
];

export const getServiceValidator = [
	check('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
	check('id').custom(isNotExistServiceById),
	validateFields,
];
