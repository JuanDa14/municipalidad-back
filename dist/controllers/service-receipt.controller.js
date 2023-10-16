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
exports.createReceipt = exports.getAllReceipt = void 0;
const models_1 = require("../models");
const date_fns_1 = require("date-fns");
const getAllReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlyReceipts = yield models_1.ServiceReceipt.find()
            .populate('client', 'name dni_ruc')
            .populate({
            path: 'service',
            select: 'name dni_ruc',
            populate: {
                path: 'type',
                select: 'name description',
            },
        })
            .sort({ createdAt: -1 })
            .lean();
        return res.json(monthlyReceipts);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getAllReceipt = getAllReceipt;
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { service, months, amount, fromDate, dni_ruc } = req.body;
        const clientFound = yield models_1.Client.findOne({ dni_ruc }).select('+_id').lean();
        if (!clientFound) {
            return res.status(400).json({ message: 'cliente no encontrado' });
        }
        const fecha = new Date(fromDate);
        const toDate = (0, date_fns_1.addMonths)(fecha, Number(months) === 0 ? Number(months) : Number(months) - 1).toLocaleDateString('es-ES');
        const price = String(Number(months) * Number(amount));
        const receipt = yield models_1.ServiceReceipt.create({
            client: clientFound._id,
            service: service,
            months: months,
            amount: price,
            fromDate: fecha.toLocaleDateString('es-ES'),
            toDate: toDate,
        });
        return res.status(200).json(receipt);
    }
    catch (error) {
        return res.status(400).json({ message: 'error al crear el recibo' });
    }
});
exports.createReceipt = createReceipt;
