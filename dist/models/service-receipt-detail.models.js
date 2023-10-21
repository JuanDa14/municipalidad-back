"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceReceiptDetailSchema = new mongoose_1.Schema({
    receipt: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServiceReceipt',
        required: [true, 'El recibo es obligatorio'],
    },
    paymentDate: {
        type: String,
    },
    amount: {
        type: String
    }
}, {
    timestamps: true,
});
const ServiceReceiptDetail = mongoose_1.models.ServiceReceiptDetail || (0, mongoose_1.model)('ServiceReceiptDetail', ServiceReceiptDetailSchema);
exports.default = ServiceReceiptDetail;
