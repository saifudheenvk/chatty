export interface INotification {
  _id: string;
  userTo: string;
  userFrom: any;
  message: string;
  notificationType: string;
  entityId: string;
  createdItemId: string;
  createdAt: Date;
  comment: string;
  reaction: string;
  post: string;
  imgId: string;
  imgVersion: string;
  gifUrl: string;
  read?: boolean;
  imgUrl?: string;
  username?: string;
}
