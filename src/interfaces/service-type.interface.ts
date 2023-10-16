export enum PaymentType{
	"Mensual" = "Mensual",
	"Evento" = "Evento"
}

export interface IServiceType {
	name: string;
	description: PaymentType;
	state: boolean;
}