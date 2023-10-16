import { Schema, Model, models, model } from 'mongoose';
import { IService } from '../interfaces';

const ServiceSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			trim: true,
			unique: true,
			uppercase: true,
		},
		state: {
			type: Boolean,
			default: true,
		},
		type: {
			type: Schema.Types.ObjectId,
			ref: 'ServiceType',
		},
	},
	{
		timestamps: true,
	}
);

const Service: Model<IService> = models.Service || model('Service', ServiceSchema);
export default Service;
