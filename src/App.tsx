import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './router';
import { useEffect } from 'react';
import { socketService } from '@services/socket/socket.service';
import Toast, { IToast } from '@components/toast/Toast';

function App() {
  const notifications: IToast[] = [
    {
      id: 1,
      type: "info",
      description: "This is a notification",
      icon: "info",
      backgroundColor: "green"
    }
  ]
  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])
  return (
    <>
      {
        notifications && notifications.length && (
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
