import { IClient } from "./client.interface";
import { IService } from "./service.interface";

export interface IServiceReceipt {
	_id: string;
	client: IClient;
	service: IService;
	months:number;
	amount: number;
	paymentDate:string,
	createdAt: string;
	updatedAt: string;
}
