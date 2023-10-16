"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        select: false,
    },
    imageURL: {
        type: String,
        default: 'https://res.cloudinary.com/dbvyaguam/image/upload/v1693714866/default-avatar-profile_uqi3ai.webp',
    },
    state: {
        type: Boolean,
        required: [true, 'El estado es obligatorio'],
        default: true,
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'El rol es obligatorio'],
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.genSalt(function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
const User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
