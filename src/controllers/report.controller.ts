import { RequestAttachment, Service, ServiceReceipt, User } from '../models';
import { Request, Response } from 'express';

export const getyears = async (req: Request, res: Response) => {
	try {
		const receiptsYears = await ServiceReceipt.aggregate([
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
		const requestYears = await RequestAttachment.aggregate([
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

		const receiptsMonth = await ServiceReceipt.aggregate([
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
		const requestMonth = await RequestAttachment.aggregate([
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
	} catch (error) {
		return res.json({
			status: 401,
			years: [],
			months: [],
		});
	}
};

export const getMonthsByYear = async (req: Request, res: Response) => {
	const { year } = req.body;
	try {
		const receiptsByYear = await ServiceReceipt.aggregate([
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
		const requestByYear = await RequestAttachment.aggregate([
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
	} catch (error) {
		return res.json({
			status: 401,
			charts: {
				ServiceReceiptChart: [],
			},
		});
	}
};

export const getChartReports = async (req: Request, res: Response) => {
	const { year, month } = req.body;
	try {
		const getServiceReport = await ServiceReceipt.find({
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
		const getRequestReport = await RequestAttachment.find({
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
	} catch (error) {
		return res.json({
			status: 401,
			data: {
				error,
			},
		});
	}
};
