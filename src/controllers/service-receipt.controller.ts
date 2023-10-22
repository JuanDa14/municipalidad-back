import { Request, Response, request } from 'express';
import { Client, ServiceReceipt, ServiceType } from '../models';
import { addMonths } from 'date-fns';
import { Service } from '../models'; // Asegúrate de importar el modelo de Service
import ServiceReceiptDetail from '../models/service-receipt-detail.models';

export const getAllReceipt = async (req: Request, res: Response) => {
	try {
		const monthlyReceipts = await ServiceReceipt.find()
			.populate('client', 'name dni_ruc')
			.populate({
				path: 'service',
				select: 'name dni_ruc',
				populate: {
					path: 'type',
					select: 'description',
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
		const receipt =await ServiceReceipt.findById(id).populate("client", "_id name email address dni_ruc").populate({
				path: 'service',
				select: 'name dni_ruc',
				populate: {
					path: 'type',
					select: 'description',
				},
			}).lean()
		const details = await ServiceReceiptDetail.find({receipt:receipt}).lean()
		return res.status(200).json({
			receipt,
			details
		}
		);

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
			return res.status(401).json({ message: 'cliente no encontrado' });
		}
		if (!serviceFound) {
			return res.status(401).json({ message: 'Servicio no encontrado' });
		}
		//fecha de pago
		const today = new Date().toLocaleDateString("es-ES");

		//Se controla si es un servicio de evento o un servicio mensual
		let price = amount
		if (Number(months)>0) {
			price = String(Number(months) * Number(amount));
		}
		const receipt = await ServiceReceipt.create({
			client: clientFound,
			service: serviceFound,
			months: months,
			amount: price,
			paymentDate: today,
		});

		//Creando detalle del recibo
		if (Number(months)>0) {
			const date = new Date(paymentDate)
			for (let index = 0; index < Number(months); index++) {
				await ServiceReceiptDetail.create({
					receipt:receipt,
					paymentDate:addMonths(date,index).toLocaleDateString("en"),
					amount:amount
				})
			}
		}

		return res.status(200).json(receipt);
	} catch (error) {
		return res.status(400).json({ message: 'error al crear el recibo' });
	}
};

export const getLastMonth =async (req:Request,res:Response) => {
	const {client,service} = req.body
	try {
		const  receiptfounded = await ServiceReceipt.findOne({
		$and: [
			{ client: client },
			{ service: service }
		]
		}).populate({path:"client"}).populate({path:"service"}).sort({createdAt:-1}).lean()
		if (!receiptfounded) {
			return res.status(200).json({paymentDate:"Ninguno"})
		}
		const found =  await ServiceReceiptDetail.findOne({receipt:receiptfounded}).populate({
			path:"receipt",
			populate:[{
				path:"client",
			},{
				path:"service",
			}
		]
		}).sort({createdAt:-1}).lean()
		if (found) {
			return res.status(200).json(found)
		}
		return res.status(200).json({paymentDate:"Ninguno"})
	} catch (error) {
		res.status(400).json({message: "Erro al obtener el mes"})
	}
}