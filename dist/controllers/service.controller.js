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
exports.deleteService = exports.updateService = exports.createService = exports.getService = exports.getServices = void 0;
const models_1 = require("../models");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield models_1.Service.find().populate('type', 'name description').lean();
        return res.json(services);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getServices = getServices;
const getService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield models_1.Service.findById(req.params.id)
            .populate('type', 'name description')
            .lean();
        return res.json(service);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getService = getService;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield models_1.Service.create(req.body);
        return res.json(service);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield models_1.Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('type', 'name description')
            .lean();
        return res.json(service);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Service.findByIdAndDelete(req.params.id);
        return res.json({ ok: true });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteService = deleteService;
