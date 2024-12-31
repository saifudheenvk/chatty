import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './router';
import { useEffect } from 'react';
import { socketService } from '@services/socket/socket.service';
import Toast, { IToast } from '@components/toast/Toast';
import { useAppSelector } from '@hooks/redux';

function App() {
  const notifications: IToast[] = useAppSelector(state => state.notifications)
  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])
  return (
    <>
      {
        notifications && notifications.length > 0 && (
          <Toast
            toastList={notifications}
            position="top-right"
            autoDelete
          />
        )
      }
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </>
  );
}

export default App;
