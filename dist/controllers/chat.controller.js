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
exports.messageForQuestion = exports.runtime = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_edge_1 = require("openai-edge");
dotenv_1.default.config();
exports.runtime = 'edge';
const configuration = new openai_edge_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_edge_1.OpenAIApi(configuration);
const messageForQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message } = req.body;
    try {
        const completion = yield openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'assistant', content: message }],
            temperature: 0.7,
        });
        const data = (yield completion.json());
        console.log(data);
        return res.json({
            ok: true,
            message: ((_a = data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || 'No tengo respuesta para eso',
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            message: 'No tengo respuesta para eso',
        });
    }
});
exports.messageForQuestion = messageForQuestion;
