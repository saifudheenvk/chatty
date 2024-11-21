import { IReaction } from "./reaction";

export interface IPostData {
  _id: string;
  userId: string;
  username: string;
  email: string;
  avatarColor: string;
  profilePicture: string;
  post: string;
  bgColor: string;
  commentsCount: number;
  feelings?: string;
  gifUrl?: string;
  privacy?: string;
  reactions?: IReaction[];
  createdAt?: Date;
  imgVersion?: string;
  imgId?: string;
  videoId?: string;
  videoVersion?: string;
  image?: string;
}
