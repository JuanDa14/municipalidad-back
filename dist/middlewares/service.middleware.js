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
exports.getServiceValidator = exports.createServiceValidator = exports.isNotExistServiceById = exports.isExistService = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const field_middleware_1 = require("./field.middleware");
const isExistService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const nameUppercase = name.toUpperCase();
    const service = yield models_1.Service.findOne({ name: nameUppercase }).select('+_id').lean();
    if (service) {
        throw new Error(`Ya existe un servicio con el nombre ${name}`);
    }
});
exports.isExistService = isExistService;
const isNotExistServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield models_1.Service.findById(id).select('+_id').lean();
    if (!service) {
        throw new Error('No existe el servicio');
    }
});
exports.isNotExistServiceById = isNotExistServiceById;
exports.createServiceValidator = [
    (0, express_validator_1.check)('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
    (0, express_validator_1.check)('type', 'El tipo es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('price', 'El tipo es requerido').trim().not().isEmpty().isNumeric(),
    (0, express_validator_1.check)('name').custom(exports.isExistService),
    field_middleware_1.validateFields,
];
exports.getServiceValidator = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(exports.isNotExistServiceById),
    field_middleware_1.validateFields,
];
