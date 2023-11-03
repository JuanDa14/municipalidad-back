import { Request, Response } from 'express';

import { RequestAttachment, ServiceReceipt, User } from '../models';

export const getDashboard = async (req: Request, res: Response) => {
	try {
		//last 5 services
		const lastRequests = await RequestAttachment.find()
			.sort({ createdAt: -1 })
			.select('urlPDF applicant eventDate state')
			.limit(5)
			.lean();

		const currentMonth = new Date().getMonth() + 1;
		//cards

		const usersByCurrentMonth = await User.aggregate([
			{
				$match: {
					$expr: {
						$eq: [{ $month: '$createdAt' }, currentMonth],
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

		const requestsByCurrentMonth = await User.aggregate([
			{
				$match: {
					$expr: {
						$eq: [{ $month: '$createdAt' }, currentMonth],
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

		const receiptByCurrentMonth = await ServiceReceipt.aggregate([
			{
				$match: {
					$expr: {
						$eq: [{ $month: '$createdAt' }, currentMonth],
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

		const totalPaymentsReceipt = await ServiceReceipt.aggregate([
			{
				$match: {
					$expr: {
						$eq: [{ $month: '$createdAt' }, currentMonth],
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

		//charts
		const receiptsPaymentByMonth = await ServiceReceipt.aggregate([
			{
				$group: {
					_id: { $month: '$createdAt' },
					total: { $sum: { $toDouble: '$amount' } },
				},
			},
		]);

		return res.json({
			users: usersByCurrentMonth.length,
			receipts: receiptByCurrentMonth.length,
			requests: requestsByCurrentMonth.length,
			totalReceiptByCurrentMonth: totalPaymentsReceipt[0],
			lastRequests,
			charts: {
				receiptsPaymentByMonth,
			},
		});
	} catch (error) {
		console.log(error);

		return res.json({ message: 'Error interno del servidor' });
	}
};
