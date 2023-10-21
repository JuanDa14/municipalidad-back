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
const mongoose_1 = require("mongoose");
const ServiceReceiptSchema = new mongoose_1.Schema({
    autoIncrement: {
        type: Number,
    },
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'El cliente es obligatorio'],
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'El servicio es obligatorio'],
    },
    months: {
        type: String,
    },
    amount: {
        type: String,
        required: [true, 'El monto es obligatorio'],
    },
    paymentDate: {
        type: String,
    },
}, {
    timestamps: true,
});
ServiceReceiptSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.autoIncrement) {
            // Encuentra el valor máximo actual
            const maxServiceReceipt = yield ServiceReceipt.findOne({}).sort('-autoIncrement');
            this.autoIncrement = maxServiceReceipt ? maxServiceReceipt.autoIncrement + 1 : 1;
        }
        next();
    });
});
const ServiceReceipt = mongoose_1.models.ServiceReceipt || (0, mongoose_1.model)('ServiceReceipt', ServiceReceiptSchema);
exports.default = ServiceReceipt;
