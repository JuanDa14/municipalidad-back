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
exports.deleteRequestAttachment = exports.updateRequestAttachment = exports.createRequestAttachment = exports.getRequestAttachment = exports.getRequestAttachments = void 0;
const models_1 = require("../models");
const getRequestAttachments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestAttachments = yield models_1.RequestAttachment.find().lean();
        return res.json(requestAttachments);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getRequestAttachments = getRequestAttachments;
const getRequestAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const requestAttachment = yield models_1.RequestAttachment.findById(id).lean();
        return res.json(requestAttachment);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getRequestAttachment = getRequestAttachment;
const createRequestAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicant, eventDate, description, urlPDF } = req.body;
    try {
        const requestAttachment = new models_1.RequestAttachment({
            applicant,
            eventDate,
            description,
            urlPDF,
        });
        yield requestAttachment.save();
        return res.json(requestAttachment);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createRequestAttachment = createRequestAttachment;
const updateRequestAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const requestAttachment = yield models_1.RequestAttachment.findByIdAndUpdate(id, req.body, {
            new: true,
        }).lean();
        return res.json(requestAttachment);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateRequestAttachment = updateRequestAttachment;
const deleteRequestAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield models_1.RequestAttachment.findByIdAndDelete(id);
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteRequestAttachment = deleteRequestAttachment;
