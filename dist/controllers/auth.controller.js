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
exports.refreshTokenUser = exports.loginUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_jwt_helper_1 = require("../helpers/generate-jwt.helper");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userInDB = yield user_model_1.default.findOne({ email, state: true })
            .select('-createdAt -updatedAt -__v')
            .populate('role', 'name');
        if (!userInDB)
            throw new Error('El usuario no se encuentra registrado');
        const isMatch = yield userInDB.comparePassword(password);
        if (!isMatch)
            throw new Error('El email o la contraseña son incorrectos');
        const accessToken = yield (0, generate_jwt_helper_1.generateJWT)(userInDB._id, 'access-token');
        const refreshToken = yield (0, generate_jwt_helper_1.generateJWT)(userInDB._id, 'refresh-token');
        return res.json({
            ok: true,
            accessToken,
            refreshToken,
            user: userInDB,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});
exports.loginUser = loginUser;
const refreshTokenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    try {
        const user = yield user_model_1.default.findOne({ _id: id, state: true })
            .select('-createdAt -updatedAt -__v')
            .populate('role', 'name');
        if (!user)
            throw new Error('El usuario no se encuentra registrado');
        const accessToken = yield (0, generate_jwt_helper_1.generateJWT)(user._id, 'access-token');
        const refreshToken = yield (0, generate_jwt_helper_1.generateJWT)(user._id, 'refresh-token');
        return res.json({
            ok: true,
            accessToken,
            refreshToken,
            user,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});
exports.refreshTokenUser = refreshTokenUser;
