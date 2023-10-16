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
exports.getUserValidator = exports.createUserValidator = exports.isExistUserByEmail = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const role_middleware_1 = require("./role.middleware");
const field_middleware_1 = require("./field.middleware");
const isExistUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email }).select('+_id').lean();
    if (user) {
        throw new Error(`El usuario ya está registrado`);
    }
});
exports.isExistUserByEmail = isExistUserByEmail;
const IsNotExistUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id).select('+_id').lean();
    if (!user) {
        throw new Error('El usuario no existe');
    }
});
exports.createUserValidator = [
    (0, express_validator_1.check)('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
    (0, express_validator_1.check)('email', 'El correo es requerido').trim().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
    (0, express_validator_1.check)('address').trim().not().isEmpty(),
    (0, express_validator_1.check)('state').trim().not().isEmpty().isBoolean(),
    (0, express_validator_1.check)('email').custom(exports.isExistUserByEmail),
    (0, express_validator_1.check)('role', 'El rol es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('role').custom(role_middleware_1.isNotExistRoleById),
    field_middleware_1.validateFields,
];
exports.getUserValidator = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(IsNotExistUserById),
    field_middleware_1.validateFields,
];
