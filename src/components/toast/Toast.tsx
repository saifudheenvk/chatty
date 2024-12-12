import { useEffect, useCallback, useRef, useState, FC } from 'react';
import { cloneDeep } from 'lodash';
import '@components/toast/Toast.scss';
import { Utils } from '@services/utils/utils.service';
import { useAppDispatch } from '@hooks/redux';

interface ToastProps {
  toastList: IToast[];
  position?: string;
  autoDelete?: boolean;
  autoDeleteTime?: number;
}

export interface IToast {
  backgroundColor: string;
  description: string;
  icon: any;
  id: string | number;
  type: string;
}

const Toast: FC<ToastProps> = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime = 2000 } = props;
  const [list, setList] = useState(toastList);
  const listData = useRef<any[]>([]);
  const dispatch = useAppDispatch();

  const deleteToast = useCallback(() => {
    listData.current = cloneDeep(list);
    listData.current.splice(0, 1);
    setList([...listData.current]);
    if (!listData.current.length) {
      list.length = 0;
      // Utils.dispatchClearNotification(dispatch);
    }
  }, [list, dispatch]);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const tick = () => {
      deleteToast();
    };

    if (autoDelete && toastList.length && list.length) {
      const interval = setInterval(tick, autoDeleteTime);
      return () => clearInterval(interval);
    }
  }, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);

  return (
    <div className={`toast-notification-container ${position}`}>
      {list.map((toast) => (
        <div
          data-testid="toast-notification"
          key={Utils.generateString(10)}
          className={`toast-notification toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button className="cancel-button" onClick={() => deleteToast()}>
            X
          </button>
          <div className={`toast-notification-image ${toast.description.length <= 73 ? 'toast-icon' : ''}`}>
            <img src={toast.icon} alt="" />
          </div>
          <div className={`toast-notification-message ${toast.description.length <= 73 ? 'toast-message' : ''}`}>
            {toast.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
