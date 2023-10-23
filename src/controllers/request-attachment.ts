import { Request, Response } from 'express';

import { RequestAttachment } from '../models';

export const getRequestAttachments = async (req: Request, res: Response) => {
	try {
		const requestAttachments = await RequestAttachment.find().lean();
		return res.json(requestAttachments);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getRequestAttachment = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const requestAttachment = await RequestAttachment.findById(id).lean();
		return res.json(requestAttachment);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createRequestAttachment = async (req: Request, res: Response) => {
	const { applicant, eventDate, description, urlPDF } = req.body;

	try {
		const requestAttachment = new RequestAttachment({
			applicant,
			eventDate,
			description,
			urlPDF,
		});

		await requestAttachment.save();

		return res.json(requestAttachment);
	} catch (error) {
		console.log(error);

		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateRequestAttachment = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const requestAttachment = await RequestAttachment.findByIdAndUpdate(id, req.body, {
			new: true,
		}).lean();
		return res.json(requestAttachment);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteRequestAttachment = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await RequestAttachment.findByIdAndDelete(id);

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
