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
exports.getRequestAttachmentValidor = exports.createRequestAttachmentValidor = exports.isExistRequestAttachment = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const field_middleware_1 = require("./field.middleware");
const isExistRequestAttachment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const attachment = yield models_1.RequestAttachment.findById(id).select('+_id').lean();
    if (attachment) {
        throw new Error('La solicitud ya existe');
    }
});
exports.isExistRequestAttachment = isExistRequestAttachment;
const IsNotExistRequestAttachment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const attachment = yield models_1.RequestAttachment.findById(id).select('+_id').lean();
    if (!attachment) {
        throw new Error('La solicitud no existe');
    }
});
exports.createRequestAttachmentValidor = [
    (0, express_validator_1.check)('applicant', 'El solicitante es requerido').trim().not().isEmpty(),
    (0, express_validator_1.check)('eventDate', 'La fecha del evento es requerida').trim().not().isEmpty(),
    (0, express_validator_1.check)('description').trim().not().isEmpty(),
    (0, express_validator_1.check)('urlPDF').trim().not().isEmpty(),
    (0, express_validator_1.check)('state').trim().not().isEmpty().isIn(['Pendiente', 'Aprobado', 'Rechazado']),
    field_middleware_1.validateFields,
];
exports.getRequestAttachmentValidor = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(IsNotExistRequestAttachment),
    field_middleware_1.validateFields,
];
