import { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENIA_API_KEY!,
});

export const messageForQuestion = async (req: Request, res: Response) => {
	const { message, dni } = req.body;

	try {
		// const chatCompletion = await openai.chat.completions.create({
		// 	messages: [{ role: 'user', content: message }],
		// 	model: 'gpt-3.5-turbo',
		// });

		// console.log(chatCompletion.choices);

		return res.json({
			ok: true,
			message: 'Mensaje enviado con éxito',
		});
	} catch (error) {
		console.log(error);
		return res.json({
			ok: false,
			message: 'Ocurrió un error, por favor intenta nuevamente',
		});
	}
};
