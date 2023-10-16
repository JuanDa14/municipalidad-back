import { Request, Response } from 'express';
import { Service } from '../models';

export const getServices = async (req: Request, res: Response) => {
	try {
		const services = await Service.find().populate('type', 'name description').lean();
		return res.json(services);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getService = async (req: Request, res: Response) => {
	try {
		const service = await Service.findById(req.params.id)
			.populate('type', 'name description')
			.lean();
		return res.json(service);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createService = async (req: Request, res: Response) => {
	try {
		const service = await Service.create(req.body);
		return res.json(service);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateService = async (req: Request, res: Response) => {
	try {
		const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.populate('type', 'name description')
			.lean();
		return res.json(service);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteService = async (req: Request, res: Response) => {
	try {
		await Service.findByIdAndDelete(req.params.id);
		return res.json({ ok: true });
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
