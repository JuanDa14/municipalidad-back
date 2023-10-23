export enum RequestAttachmentState {
	Pending = 'Pendiente',
	Approved = 'Aprobado',
	Rejected = 'Rechazado',
}

export interface IRequestAttachment {
	applicant: string;
	eventDate: Date;
	description: string;
	urlPDF: string;
	state: RequestAttachmentState;
}
