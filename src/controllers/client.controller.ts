import { Request, Response } from 'express';

import { Client } from '../models';

export const getClients = async (req: Request, res: Response) => {
	try {
		const clients = await Client.find().lean();
		return res.json(clients);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getClient = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const client = await Client.findById(id).lean();
		return res.json(client);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createClient = async (req: Request, res: Response) => {
	const { name, email, phone, address, dni_ruc, document_type } = req.body;

	try {
		const client = new Client({
			name,
			email,
			phone,
			address,
			dni_ruc,
			document_type,
		});

		await client.save();

		return res.json(client);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateClient = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const client = await Client.findByIdAndUpdate(id, req.body, { new: true }).lean();
		return res.json(client);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteClient = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await Client.findByIdAndDelete(id);
		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getClientByDni = async (req: Request, res: Response) => {
	const { dni } = req.params;

	try {
		const client = await Client.findOne({'dni_ruc':dni}).lean();
		return res.json(client);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
