export interface IPost {
	postedBy: string;
	topic: string;
	date: Date;
	message: string;
	id?: string | number;
	status?: boolean; 
}