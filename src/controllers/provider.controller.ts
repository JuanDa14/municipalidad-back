import { Request, Response } from 'express';

import { Provider } from '../models';

export const getProviders = async (req: Request, res: Response) => {
	try {
		const providers = await Provider.find().lean();
		return res.json(providers);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getProvider = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const provider = await Provider.findById(id).lean();
		return res.json(provider);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createProvider = async (req: Request, res: Response) => {
	const { name, dni_ruc, document_type, address } = req.body;

	try {
		const provider = new Provider({
			name,
			dni_ruc,
			document_type,
			address,
		});

		await provider.save();

		return res.json(provider);
	} catch (error) {
		console.log(error);

		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateProvider = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const provider = await Provider.findByIdAndUpdate(id, req.body, { new: true }).lean();
		return res.json(provider);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteProvider = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await Provider.findByIdAndDelete(id);

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
