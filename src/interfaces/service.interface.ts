import { IServiceType } from "./service-type.interface";

export interface IService {
	name: string;
	state: boolean;
	type: IServiceType
}