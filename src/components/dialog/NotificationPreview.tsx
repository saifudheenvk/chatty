import Button from '@components/button/Button';
import { reactionsMap } from '@services/utils/static.data';

import '@components/dialog/NotificationPreview.scss';
import { FC } from 'react';


interface INotificationPreview {
  title: string;
  post?: string;
  imgUrl?: string;
  comment?: string;
  reaction: string;
  senderName?: string;
  secondButtonText: string;
  secondBtnHandler?: () => void;
}
const NotificationPreview: FC<INotificationPreview> = ({
  title,
  post,
  imgUrl,
  comment,
  reaction,
  senderName,
  secondButtonText,
  secondBtnHandler
}) => {
  return (
    <>
      <div className="notification-preview-container" data-testid="notification-preview">
        <div className="dialog">
          <h4>{title}</h4>
          <div className="dialog-body">
            {post && <span className="dialog-body-post">{post}</span>}
            {imgUrl && <img className="dialog-body-img" src={imgUrl} alt="" />}
            {comment && <span className="dialog-body-comment">{comment}</span>}
            {reaction && (
              <div className="dialog-body-reaction" data-testid="reaction">
                <span className="dialog-body-reaction-text">{senderName} reacted on your post with</span>{' '}
                <img className="reaction-img" src={`${reactionsMap[`${reaction}`]}`} alt="" />
              </div>
            )}
          </div>
          <div className="btn-container">
            <Button className="button cancel-btn" label={secondButtonText} handleClick={secondBtnHandler} />
          </div>
        </div>
      </div>
    </>
  );
};


export default NotificationPreview;
