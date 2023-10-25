import { Schema, Model, models, model } from 'mongoose';
import { IServiceReceipt } from '../interfaces';

const ServiceReceiptSchema: Schema = new Schema<IServiceReceipt>(
	{
		autoIncrement: {
			type: Number,
		},
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
		months: {
			type: String,
		},
		amount: {
			type: String,
			required: [true, 'El monto es obligatorio'],
		},
		paymentDate: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

ServiceReceiptSchema.pre('save', async function (next) {
	if (!this.autoIncrement) {
		// Encuentra el valor máximo actual
		const maxServiceReceipt = await ServiceReceipt.findOne({}).sort('-autoIncrement');
		this.autoIncrement = maxServiceReceipt ? maxServiceReceipt.autoIncrement + 1 : 1;
	}
	next();
});

const ServiceReceipt: Model<IServiceReceipt> =
	models.ServiceReceipt || model<IServiceReceipt>('ServiceReceipt', ServiceReceiptSchema);

export default ServiceReceipt;
