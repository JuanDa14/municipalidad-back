import { Schema, Model, models, model } from 'mongoose';
import { IServiceReceiptDetail } from '../interfaces';

const ServiceReceiptDetailSchema = new Schema(
	{
		receipt: {
			type: Schema.Types.ObjectId,
			ref: 'ServiceReceipt',
			required: [true, 'El recibo es obligatorio'],
		},
		paymentDate: {
			type: String,
		},
		amount:{
			type:String
		}
	},
	{
		timestamps: true,
	}
);

const ServiceReceiptDetail: Model<IServiceReceiptDetail> =
	models.ServiceReceiptDetail || model('ServiceReceiptDetail', ServiceReceiptDetailSchema);

export default ServiceReceiptDetail;
