import { IRole } from './role.interface';

export interface IUser {
	_id: string;
	name: string;
	role: IRole;
	email: string;
	imageURL: string;
	state: boolean;
	address: string;
	password?: string;
}
