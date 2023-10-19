import { IServiceReceipt } from "./service-receipt.interface"

export interface IServiceReceiptDetail{
    _id:string
    receipt: IServiceReceipt
    paymentDate:string
    amount:string
    createdAt: string;
	updatedAt: string;
} 