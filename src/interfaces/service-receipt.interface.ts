import { IClient } from "./client.interface";
import { IService } from "./service.interface";

export interface IServiceReceipt {
	_id: string;
	autoIncrement:number
	client: IClient;
	service: IService;
	months:string;
	amount: string;
	paymentDate:string,
	createdAt: string;
	updatedAt: string;
}
