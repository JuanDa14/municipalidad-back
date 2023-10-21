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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMonth = exports.createReceipt = exports.getReceiptById = exports.getAllReceipt = void 0;
const models_1 = require("../models");
const date_fns_1 = require("date-fns");
const models_2 = require("../models"); // Asegúrate de importar el modelo de Service
const service_receipt_detail_models_1 = __importDefault(require("../models/service-receipt-detail.models"));
const getAllReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlyReceipts = yield models_1.ServiceReceipt.find()
            .populate('client', 'name dni_ruc')
            .populate({
            path: 'service',
            select: 'name dni_ruc',
            populate: {
                path: 'type',
                select: 'description',
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
const getReceiptById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receipt = yield models_1.ServiceReceipt.findById(id).populate("client", "_id name email address dni_ruc").populate("service", "_id name").lean();
        const details = yield service_receipt_detail_models_1.default.find({ receipt: receipt }).lean();
        return res.status(200).json({
            receipt,
            details
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getReceiptById = getReceiptById;
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { service, months, amount, paymentDate, dni_ruc } = req.body;
        //Encontrando cliente Cliente
        const clientFound = yield models_1.Client.findOne({ dni_ruc }).select('+_id').lean();
        const serviceFound = yield models_2.Service.findOne({ _id: service }).lean();
        //Si no encuentra el cliente
        if (!clientFound) {
            return res.status(401).json({ message: 'cliente no encontrado' });
        }
        if (!serviceFound) {
            return res.status(401).json({ message: 'Servicio no encontrado' });
        }
        //fecha de pago
        const today = new Date().toLocaleDateString("es-ES");
        //Se controla si es un servicio de evento o un servicio mensual
        let price = amount;
        if (Number(months) > 0) {
            price = String(Number(months) * Number(amount));
        }
        const receipt = yield models_1.ServiceReceipt.create({
            client: clientFound,
            service: serviceFound,
            months: months,
            amount: price,
            paymentDate: today,
        });
        //Creando detalle del recibo
        if (Number(months) > 0) {
            const date = new Date(paymentDate);
            for (let index = 0; index < Number(months); index++) {
                yield service_receipt_detail_models_1.default.create({
                    receipt: receipt,
                    paymentDate: (0, date_fns_1.addMonths)(date, index).toLocaleDateString("en"),
                    amount: amount
                });
            }
        }
        return res.status(200).json(receipt);
    }
    catch (error) {
        return res.status(400).json({ message: 'error al crear el recibo' });
    }
});
exports.createReceipt = createReceipt;
const getLastMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client, service } = req.body;
    try {
        const found = yield service_receipt_detail_models_1.default.findOne().populate({
            path: "receipt",
            match: [{ client: client }, { service: service }]
        }).lean();
        res.status(200).json(found);
    }
    catch (error) {
        res.status(400).json({ message: "Erro al obtener el mes" });
    }
});
exports.getLastMonth = getLastMonth;
