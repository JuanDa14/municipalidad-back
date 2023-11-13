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
exports.getChartReports = exports.getMonthsByYear = exports.getyears = void 0;
const models_1 = require("../models");
const getyears = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiptsYears = yield models_1.ServiceReceipt.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$year',
                },
            },
        ]);
        const requestYears = yield models_1.RequestAttachment.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$year',
                },
            },
        ]);
        const allYearsSet = new Set([
            ...receiptsYears.map((item) => item._id),
            ...requestYears.map((item) => item._id),
        ]);
        const allYearsArray = Array.from(allYearsSet);
        const receiptsMonth = yield models_1.ServiceReceipt.aggregate([
            {
                $project: {
                    year: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$year',
                },
            },
        ]);
        const requestMonth = yield models_1.RequestAttachment.aggregate([
            {
                $project: {
                    year: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$year',
                },
            },
        ]);
        const allMonthSet = new Set([
            ...receiptsMonth.map((item) => item._id),
            ...requestMonth.map((item) => item._id),
        ]);
        const allMonthArray = Array.from(allMonthSet);
        return res.json({
            status: 200,
            years: allYearsArray || [],
            months: allMonthArray || [],
        });
    }
    catch (error) {
        return res.json({
            status: 401,
            years: [],
            months: [],
        });
    }
});
exports.getyears = getyears;
const getMonthsByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.body;
    try {
        const receiptsByYear = yield models_1.ServiceReceipt.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: '$createdAt' }, year],
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: { $toDouble: '$amount' } },
                },
            },
        ]);
        const requestByYear = yield models_1.RequestAttachment.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: '$createdAt' }, year],
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: 1 },
                },
            },
        ]);
        return res.json({
            status: 200,
            charts: {
                ServiceReceiptChart: receiptsByYear || [],
                RequestChart: requestByYear || [],
            },
        });
    }
    catch (error) {
        return res.json({
            status: 401,
            charts: {
                ServiceReceiptChart: [],
            },
        });
    }
});
exports.getMonthsByYear = getMonthsByYear;
const getChartReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month } = req.body;
    try {
        const getServiceReport = yield models_1.ServiceReceipt.find({
            $expr: {
                $and: [
                    { $eq: [{ $year: '$createdAt' }, year] },
                    { $eq: [{ $month: '$createdAt' }, month] },
                ],
            },
        })
            .populate('client', 'name dni_ruc')
            .populate({
            path: 'service',
            select: 'name dni_ruc',
            populate: {
                path: 'type',
                select: 'description',
            },
        })
            .lean();
        const getRequestReport = yield models_1.RequestAttachment.find({
            $expr: {
                $and: [
                    { $eq: [{ $year: '$createdAt' }, year] },
                    { $eq: [{ $month: '$createdAt' }, month] },
                ],
            },
        }).lean();
        return res.json({
            status: 200,
            data: {
                serviceReport: getServiceReport || [],
                requestReport: getRequestReport || [],
            },
        });
    }
    catch (error) {
        return res.json({
            status: 401,
            data: {
                error,
            },
        });
    }
});
exports.getChartReports = getChartReports;
