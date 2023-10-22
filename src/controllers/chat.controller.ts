import { Request, Response } from 'express';

export const messageForQuestion = async (req: Request, res: Response) => {
	const { message } = req.body;

	try {
		return res.json({
			ok: true,
			message: 'responde.answer',
		});
	} catch (error) {
		console.log(error);
		return res.json({
			ok: false,
			message: 'Ocurrió un error, por favor intenta nuevamente',
		});
	}
};
