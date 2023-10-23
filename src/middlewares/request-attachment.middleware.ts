import { check } from 'express-validator';
import { RequestAttachment } from '../models';
import { validateFields } from './field.middleware';

export const isExistRequestAttachment = async (id: string) => {
	const attachment = await RequestAttachment.findById(id).select('+_id').lean();

	if (attachment) {
		throw new Error('La solicitud ya existe');
	}
};

const IsNotExistRequestAttachment = async (id: string) => {
	const attachment = await RequestAttachment.findById(id).select('+_id').lean();

	if (!attachment) {
		throw new Error('La solicitud no existe');
	}
};

export const createRequestAttachmentValidor = [
	check('applicant', 'El solicitante es requerido').trim().not().isEmpty(),
	check('eventDate', 'La fecha del evento es requerida').trim().not().isEmpty(),
	check('description').trim().not().isEmpty(),
	check('urlPDF').trim().not().isEmpty(),
	check('state').trim().not().isEmpty().isIn(['Pendiente', 'Aprobado', 'Rechazado']),
	validateFields,
];

export const getRequestAttachmentValidor = [
	check('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
	check('id').custom(IsNotExistRequestAttachment),
	validateFields,
];
