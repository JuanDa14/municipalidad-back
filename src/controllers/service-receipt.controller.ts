import { Request, Response, request } from 'express';
import { Client, ServiceReceipt, ServiceType } from '../models';
import { addMonths } from 'date-fns';
import { Service } from '../models'; // Asegúrate de importar el modelo de Service

export const getAllReceipt = async (req: Request, res: Response) => {
	try {
		const monthlyReceipts = await ServiceReceipt.find()
			.populate('client', 'name dni_ruc')
			.populate({
				path: 'service',
				select: 'name dni_ruc',
				populate: {
					path: 'type',
					select: 'name description',
				},
			})
			.sort({ createdAt: -1 })
			.lean();
		return res.json(monthlyReceipts);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
export const getReceiptById = async(req: Request, res: Response)=>{
	try {
		const {id} = req.params
		const receipt =await ServiceReceipt.findById(id).populate("client", "name").lean()
		return res.status(200).json(receipt);

	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
}


export const createReceipt = async (req: Request, res: Response) => {
	try {
		const { service, months, amount, paymentDate, dni_ruc } = req.body;
		//Encontrando cliente Cliente
		const clientFound = await Client.findOne({ dni_ruc }).select('+_id').lean();
		const serviceFound = await Service.findOne({_id : service}).lean()
		//Si no encuentra el cliente
		if (!clientFound) {
			return res.status(400).json({ message: 'cliente no encontrado' });
		}
		//Encontrando fecha
		const fecha = new Date(paymentDate);

		const toDate = addMonths(
			fecha,
			Number(months) === 0 ? Number(months) : Number(months) - 1
		).toLocaleDateString('es-ES');

		let price = amount
		//Calculando precio total si es mayor a 0
		if (Number(months)>0) {
			price = String(Number(months) * Number(amount));
		}
		const receipt = await ServiceReceipt.create({
			client: clientFound._id,
			service: service,
			months: months,
			amount: price,
			fromDate: fecha.toLocaleDateString('es-ES'),
			toDate: toDate,
		});
		return res.status(200).json(receipt);
	} catch (error) {
		return res.status(400).json({ message: 'error al crear el recibo' });
	}
};
