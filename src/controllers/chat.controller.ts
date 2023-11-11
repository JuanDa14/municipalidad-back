import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi, ResponseTypes } from 'openai-edge';

dotenv.config();

export const runtime = 'edge';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const messageForQuestion = async (req: Request, res: Response) => {
	const { message } = req.body;

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'assistant', content: message }],
			temperature: 0.7,
		});

		const data = (await completion.json()) as ResponseTypes['createChatCompletion'];
		console.log(data);

		return res.json({
			ok: true,
			message: data.choices[0].message?.content || 'No tengo respuesta para eso',
		});
	} catch (error) {
		console.log(error);
		return res.json({
			ok: false,
			message: 'No tengo respuesta para eso',
		});
	}
};
