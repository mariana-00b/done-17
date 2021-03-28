import { IPost } from "../../interfaces/post/post.interface";

export class Post implements IPost {
	constructor(
		public postedBy: string,
		public topic: string,
		public date: Date,
		public message: string,
		public id?: string | number
	) {}
}