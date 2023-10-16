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
exports.getProviderValidator = exports.createProviderValidator = exports.isExistproviderByDNIRUC = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const field_middleware_1 = require("./field.middleware");
const isExistproviderByDNIRUC = (dni_ruc) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield models_1.Provider.findOne({ dni_ruc }).select('+_id').lean();
    if (provider) {
        throw new Error('El proveedor ya existe');
    }
});
exports.isExistproviderByDNIRUC = isExistproviderByDNIRUC;
const IsNotExistProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield models_1.Provider.findById(id).select('+_id').lean();
    if (!provider) {
        throw new Error('El proveedor no existe');
    }
});
exports.createProviderValidator = [
    (0, express_validator_1.check)('name', 'El nombre es requerido').trim().not().isEmpty(),
    (0, express_validator_1.check)('address', 'La dirección es requerida').trim().not().isEmpty(),
    (0, express_validator_1.check)('document_type').trim().not().isEmpty().isIn(['DNI', 'RUC']),
    (0, express_validator_1.check)('state').trim().not().isEmpty().isBoolean(),
    (0, express_validator_1.check)('condition').trim().not().isEmpty().isIn(['HABIDO', 'NO HABIDO']),
    (0, express_validator_1.check)('dni_ruc').trim().not().isEmpty(),
    (0, express_validator_1.check)('dni_ruc').custom(exports.isExistproviderByDNIRUC),
    field_middleware_1.validateFields,
];
exports.getProviderValidator = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(IsNotExistProviderById),
    field_middleware_1.validateFields,
];
