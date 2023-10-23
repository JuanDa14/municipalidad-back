import { Schema, Model, models, model } from 'mongoose';
import { IRequestAttachment } from '../interfaces';

const RequestAttachmentSchema = new Schema(
	{
		applicant: {
			type: String,
			required: [true, 'El solicitante es obligatorio'],
		},
		eventDate: {
			type: Date,
			required: [true, 'La fecha del evento es obligatorio'],
		},
		description: {
			type: String,
			required: [true, 'La descripción es obligatoria'],
		},
		urlPDF: {
			type: String,
			required: [true, 'La url del PDF es obligatoria'],
		},
		state: {
			type: String,
			enum: ['Pendiente', 'Aprobado', 'Rechazado'],
			required: [true, 'El estado es obligatorio'],
			default: 'Pendiente',
		},
	},
	{
		timestamps: true,
	}
);

const RequestAttachment: Model<IRequestAttachment> =
	models.RequestAttachment || model('RequestAttachment', RequestAttachmentSchema);

export default RequestAttachment;
