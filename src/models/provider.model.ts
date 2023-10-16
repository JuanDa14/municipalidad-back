import { Schema, Model, models, model } from 'mongoose';
import { IProvider } from '../interfaces';

const ProviderSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			unique: true,
			trim: true,
		},
		dni_ruc: {
			type: String,
			required: [true, 'El DNI/RUC es obligatorio'],
			unique: true,
			trim: true,
		},
		address: {
			type: String,
			required: [true, 'El monto es obligatorio'],
		},
		condition: {
			type: String,
			enum: ['HABIDO', 'NO HABIDO'],
			required: [true, 'La condición es obligatoria'],
			default: 'HABIDO',
		},
		state: {
			type: Boolean,
			required: [true, 'El estado es obligatorio'],
			default: true,
		},
		document_type: {
			type: String,
			required: [true, 'El tipo de documento es obligatorio'],
		},
	},
	{
		timestamps: true,
	}
);

const Provider: Model<IProvider> = models.Provider || model('Provider', ProviderSchema);

export default Provider;
