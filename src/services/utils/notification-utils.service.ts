import { notificationService } from "@services/api/notifications/notification.service";
import { socketService } from "@services/socket/socket.service";
import { INotification } from "@services/utils/types/notification";
import { Utils } from "@services/utils/utils.service";
import { IUserDocument } from "./types/user";
import { cloneDeep, find, findIndex, remove, sumBy } from "lodash";



export class NotificationUtils {

  static socketIONotifications(profile: IUserDocument | null, notifications: INotification[], setNotifications: (value: any) => void, type: string, setNotificationsCount: (value: number) => void) {
    socketService.socket?.on('insert notification', (data: INotification[], userToData) => {
      if(profile?._id === userToData.userTo) {
        notifications = [...data];
        if(type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications: any[] = NotificationUtils.mapNotificationDropdownItems(notifications, setNotificationsCount);
          setNotifications(mappedNotifications);
        }
      }
    })

    socketService?.socket?.on('update notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      const notificationData = find(notifications, (notification) => notification._id === notificationId);
      if (notificationData) {
        const index = findIndex(notifications, (notification) => notification._id === notificationId);
        notificationData.read = true;
        notifications.splice(index, 1, notificationData);
        if (type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
            notifications,
            setNotificationsCount
          );
          setNotifications(mappedNotifications);
        }
      }
    });

    socketService?.socket?.on('delete notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      remove(notifications, (notification) => notification._id === notificationId);
      if (type === 'notificationPage') {
        setNotifications(notifications);
      } else {
        const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
          notifications,
          setNotificationsCount
        );
        setNotifications(mappedNotifications);
      }
    });

  }

  static mapNotificationDropdownItems(notificationData: any, setNotificationsCount: (value: number) => void) {
    const items = [];
    for (const notification of notificationData) {
      const item = {
        _id: notification?._id,
        topText: notification?.topText ? notification?.topText : notification?.message,
        subText: notification?.subText,
        createdAt: notification?.createdAt,
        username: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        avatarColor: notification?.userFrom ? notification?.userFrom.avatarColor : notification?.avatarColor,
        profilePicture: notification?.userFrom ? notification?.userFrom.profilePicture : notification?.profilePicture,
        read: notification?.read,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
          ? notification?.gifUrl
          : notification?.imgUrl,
        comment: notification?.comment,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        notificationType: notification?.notificationType
      };
      items.push(item);
    }
    const count = sumBy(items, selevtedItem => selevtedItem?.read ? 0 : 1);
    setNotificationsCount(count);
    return items;
  }

   static async markMessageAsRead(messageId: string, notification: INotification, setNotificationDialogContent: any) {
    if(notification.notificationType !== 'flollows') {
      const notificationDialog = {
        createdAt: notification?.createdAt,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
          ? notification?.gifUrl
          : notification?.imgUrl,
        comment: notification?.comment !== '' ? notification?.comment : notification?.message,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username
      };
      console.log(notificationDialog)
      setNotificationDialogContent(notificationDialog);
    }
    await notificationService.markNotificationAsRead(messageId);
   }
}
