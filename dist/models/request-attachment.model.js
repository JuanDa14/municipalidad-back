"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestAttachmentSchema = new mongoose_1.Schema({
    applicant: {
        type: String,
        required: [true, 'El solicitante es obligatorio'],
    },
    eventDate: {
        type: Date,
        required: [true, 'La fecha del evento es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    urlPDF: {
        type: String,
        required: [true, 'La url del PDF es obligatoria'],
    },
    state: {
        type: String,
        enum: ['Pendiente', 'Aprobado', 'Rechazado'],
        required: [true, 'El estado es obligatorio'],
        default: 'Pendiente',
    },
}, {
    timestamps: true,
});
const RequestAttachment = mongoose_1.models.RequestAttachment || (0, mongoose_1.model)('RequestAttachment', RequestAttachmentSchema);
exports.default = RequestAttachment;
