"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageForQuestion = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENIA_API_KEY,
});
const messageForQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            message: 'Ocurrió un error, por favor intenta nuevamente',
        });
    }
});
exports.messageForQuestion = messageForQuestion;
