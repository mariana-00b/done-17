import { IUser } from "../../interfaces/user/user.interface";

export class User implements IUser {
	constructor(
		public email: string,
		public password: string,
		public username?: string
	) {}
}