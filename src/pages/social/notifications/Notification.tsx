import Avatar from "@components/avatar/Avatar"
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import useEffectOnce from "@hooks/useEffectOnce";
import { notificationService } from "@services/api/notifications/notification.service";
import { INotification } from "@services/utils/types/notification";
import { Utils } from "@services/utils/utils.service";
import { FC, useEffect, useState } from "react";
import { FaCircle, FaRegCircle, FaRegTrashAlt } from "react-icons/fa"
import "./Notification.scss"
import NotificationPreview from "@components/dialog/NotificationPreview";
import { NotificationUtils } from "@services/utils/notification-utils.service";

const Notification: FC = () => {

  const profile = useAppSelector((state) => state.user.profile);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: '',
    imgUrl: '',
    comment: '',
    reaction: '',
    senderName: ''
  });

  const dispatch = useAppDispatch();

  const getUserNotifications = async () => {
    try {
      const notifications = await notificationService.getUserNotifications();
      setNotifications(notifications.data.notifications);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  }

  const markAsRead = async (notification: INotification) => {
    try {
      NotificationUtils.markMessageAsRead(notification?._id, notification, setNotificationDialogContent);
    } catch (error: any) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const deleteNotification = async (event: any, messageId: string) => {
    event.stopPropagation();
    try {
      const response = await notificationService.deleteNotification(messageId);
      Utils.dispatchNotification(response.data.message, 'success', dispatch);
    } catch (error: any) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  }

  useEffectOnce(() => {
    getUserNotifications();
  });

  useEffect(() => {
    NotificationUtils.socketIONotifications(profile, notifications, setNotifications, 'notificationPage', ()=>{});
  }, [notifications, profile]);


  return (
    <>
      {
        notificationDialogContent.comment && (
          <NotificationPreview
            title="Your post"
            comment={notificationDialogContent.comment}
            imgUrl={notificationDialogContent.imgUrl}
            post={notificationDialogContent.post}
            reaction={notificationDialogContent.reaction}
            senderName={notificationDialogContent.senderName}
            secondButtonText="Close"
            secondBtnHandler={() => setNotificationDialogContent({
              post: '',
              imgUrl: '',
              comment: '',
              reaction: '',
              senderName: ''
            })}
          />
        )
      }
      <div className="notifications-container">
        <div className="notifications">Notifications</div>
        {
          notifications.length > 0 && (
            <div className="notifications-box">
              { notifications.map((notification: INotification) => (
                <div className="notification-box" onClick={() => markAsRead(notification)} data-testid="notification-box" key={notification._id}>
                    <div className="notification-box-sub-card">
                        <div className="notification-box-sub-card-media">
                            <div className="notification-box-sub-card-media-image-icon">
                                <Avatar name={notification?.userFrom?.username} bgColor={notification?.userFrom?.avatarColor}
                                    textColor="#ffffff" size={40} avatarSrc={notification?.userFrom?.profilePicture} />
                            </div>
                            <div className="notification-box-sub-card-media-body">
                                <h6 className="title">
                                    {notification?.message}
                                    <small onClick={(event) => deleteNotification(event, notification?._id)} data-testid="subtitle" className="subtitle">
                                        <FaRegTrashAlt className="trash" />
                                    </small>
                                </h6>
                                <div className="subtitle-body">
                                    <small className="subtitle">
                                        {!notification?.read ?
                                        <FaCircle className="icon" /> :
                                        <FaRegCircle className="icon" />}
                                    </small>
                                    <p className="subtext">1 hr ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          )
        }
        {loading && !notifications.length && <div className="notifications-box"></div>}
        {!loading && !notifications.length && (
          <h3 className="empty-page" data-testid="empty-page">
            You have no notification
          </h3>
        )}
      </div>
    </>
  )
}

export default Notification
