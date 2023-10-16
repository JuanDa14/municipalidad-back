import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { Client, Role, Service, ServiceReceipt, ServiceType, User } from '../models';

export async function seedData(req: Request, res: Response) {
	try {
		if (process.env.NODE_ENV === 'production') {
			return res.status(401).json({ message: 'No tiene permisos' });
		}

		await Promise.all([
			Role.deleteMany(),
			User.deleteMany(),
			Service.deleteMany(),
			ServiceType.deleteMany(),
			Client.deleteMany(),
			ServiceReceipt.deleteMany(),
		]);

		//Roles
		const roles = await Role.insertMany([
			{ name: 'Administrador' },
			{ name: 'Super Usuario' },
			{ name: 'Usuario' },
		]);

		//Usuarios
		await User.insertMany([
			{
				name: 'Administrador',
				email: 'admin@test.com',
				password: bcrypt.hashSync('password', 10),
				role: roles[0]._id,
				address: 'Calle 123',
			},
			{
				name: 'Super Usuario',
				email: 'superusuario@test.com',
				password: bcrypt.hashSync('password', 10),
				role: roles[1]._id,
				address: 'Calle 123',
			},
			{
				name: 'Usuario',
				email: 'usuario@test.com',
				password: bcrypt.hashSync('password', 10),
				role: roles[2]._id,
				address: 'Calle 123',
			},
		]);

		const serviceTypes = await ServiceType.insertMany([
			{ name: 'Agua y Desague', description: 'Mensual' },
			{ name: 'Baja Policia', description: 'Mensual' },
			{ name: 'Registro Civil', description: 'Evento' },
			{ name: 'SISA', description: 'Mensual' },
			{ name: 'Eventos Deportivos', description: 'Evento' },
		]);

		const services = await Service.insertMany([
			{ name: 'Agua y Desague', state: true, type: serviceTypes[0]._id },
			{ name: 'Baja Policia', state: true, type: serviceTypes[1]._id },
			{ name: 'SISA', state: true, type: serviceTypes[3]._id },
			{ name: 'Deportivo', state: true, type: serviceTypes[4]._id },
			{ name: 'Matrimonios', state: true, type: serviceTypes[2]._id },
			{ name: 'Nacimientos', state: true, type: serviceTypes[2]._id },
			{ name: 'Defunciones', state: true, type: serviceTypes[2]._id },
			{ name: 'Inscripciones', state: true, type: serviceTypes[2]._id },
		]);
		const clients = await Client.insertMany([
			{
				name: 'Luis Albarran Jara',
				email: 'luisalbarran21rl04091216@gmail.com',
				phone: '996357038',
				address: 'A.V. Panamericana 558',
				dni_ruc: '75583132',
				document_type: 'DNI',
			},
			{
				name: 'Fernando Albarran Jara',
				email: 'Fernando@gmail.com',
				phone: '996355095',
				address: 'A.V. Panamericana 558',
				dni_ruc: '75583133',
				document_type: 'DNI',
			},
		]);
		await ServiceReceipt.insertMany([
			//cliente 1
			{
				client: clients[0],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/01/2023',
				toDate: '10/01/2023',
			},
			{
				client: clients[0],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/02/2023',
				toDate: '10/02/2023',
			},
			{
				client: clients[0],
				service: services[1],
				months: 1,
				amount: 30,
				fromDate: '10/02/2023',
				toDate: '10/01/2023',
			},
			{
				client: clients[0],
				service: services[3],
				months: 0,
				amount: 50,
				fromDate: '25/02/2023',
				toDate: '25/02/2023',
			},
			{
				client: clients[0],
				service: services[4],
				months: 0,
				amount: 400,
				fromDate: '30/02/2023',
				toDate: '30/02/2023',
			},
			{
				client: clients[0],
				service: services[7],
				months: 0,
				amount: 130,
				fromDate: '10/03/2023',
				toDate: '10/03/2023',
			},
			//Cliente 2
			{
				client: clients[1],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/01/2023',
				toDate: '10/01/2023',
			},
			{
				client: clients[1],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/02/2023',
				toDate: '10/02/2023',
			},
			{
				client: clients[1],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/03/2023',
				toDate: '10/03/2023',
			},
			{
				client: clients[1],
				service: services[4],
				months: 0,
				amount: 200,
				fromDate: '16/01/2023',
				toDate: '16/01/2023',
			},
			{
				client: clients[1],
				service: services[0],
				months: 1,
				amount: 30,
				fromDate: '10/04/2023',
				toDate: '10/04/2023',
			},
			{
				client: clients[1],
				service: services[5],
				months: 0,
				amount: 123,
				fromDate: '20/03/2023',
				toDate: '20/03/2023',
			},
		]);

		return res.status(200).json({ message: 'Seed ejecutado correctamente' });
	} catch (error) {
		return res.status(500).json({ message: 'Error al ejecutar el seed' });
	}
}
