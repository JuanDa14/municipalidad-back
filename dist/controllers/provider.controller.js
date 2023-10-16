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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = exports.updateProvider = exports.createProvider = exports.getProvider = exports.getProviders = void 0;
const models_1 = require("../models");
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield models_1.Provider.find().lean();
        return res.json(providers);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getProviders = getProviders;
const getProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const provider = yield models_1.Provider.findById(id).lean();
        return res.json(provider);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getProvider = getProvider;
const createProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dni_ruc, document_type, address } = req.body;
    try {
        const provider = new models_1.Provider({
            name,
            dni_ruc,
            document_type,
            address,
        });
        yield provider.save();
        return res.json(provider);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createProvider = createProvider;
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const provider = yield models_1.Provider.findByIdAndUpdate(id, req.body, { new: true }).lean();
        return res.json(provider);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateProvider = updateProvider;
const deleteProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield models_1.Provider.findByIdAndDelete(id);
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteProvider = deleteProvider;
