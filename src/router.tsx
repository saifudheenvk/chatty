import { AuthTabs, ForgotPassword, ResetPassword } from "./pages/auth/index";
import { useRoutes } from 'react-router-dom';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthTabs/>
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword/>
    },
    {
      path: '/reset-password',
      element: <ResetPassword/>
    }
  ]);

  return routes;
};


export default AppRoutes;
