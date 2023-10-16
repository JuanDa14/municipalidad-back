import { Schema, Model, models, model } from 'mongoose';
import { IServiceReceipt } from '../interfaces';

const ServiceReceiptSchema = new Schema(
	{
		client: {
			type: Schema.Types.ObjectId,
			ref: 'Client',
			required: [true, 'El cliente es obligatorio'],
		},
		service: {
			type: Schema.Types.ObjectId,
			ref: 'Service',
			required: [true, 'El servicio es obligatorio'],
		},
		months:{
			type:Number
		},
		amount: {
			type: Number,
			required: [true, 'El monto es obligatorio'],
		},
		fromDate:{
			type:String,
		},
		toDate:{
			type:String,
		}
	},
	{
		timestamps: true,
	}
);

const ServiceReceipt: Model<IServiceReceipt> =
	models.ServiceReceipt || model('ServiceReceipt', ServiceReceiptSchema);

export default ServiceReceipt;
