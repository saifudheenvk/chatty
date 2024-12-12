import { AuthTabs, ForgotPassword, ResetPassword } from "@pages/auth";
import { useRoutes } from 'react-router-dom';
import ProtectedRoute from "@pages/ProtectedRoute";
import Error from "@pages/error/Error";
import { lazy, Suspense } from "react";
import StreamsSkeleton from "@pages/social/streams/StreamsSkeleton";

const Social = lazy(() => import('@pages/social/Social'));
const Chat = lazy(() => import('@pages/social/chat/Chat'));
const Followers = lazy(() => import('@pages/social/followers/Followers'));
const Following = lazy(() => import('@pages/social/following/Following'));
const Notification = lazy(() => import('@pages/social/notifications/Notification'));
const People = lazy(() => import('@pages/social/people/People'));
const Photos = lazy(() => import('@pages/social/photos/Photos'));
const Videos = lazy(() => import('@pages/social/videos/Videos'));
const Profile = lazy(() => import('@pages/social/profile/Profile'));
const Streams = lazy(() => import('@pages/social/streams/Streams'));

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
    },
    {
      path: '/app/social',
      element: (
        <ProtectedRoute>
          <Social/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'streams',
          element: <Suspense fallback={<StreamsSkeleton/>}><Streams/></Suspense>
        },
        {
          path: 'chat/messages',
          element: <Suspense fallback={<div>Loading...</div>}><Chat/></Suspense>
        },
        {
          path: 'people',
          element: <Suspense fallback={<div>Loading...</div>}><People/></Suspense>
        },
        {
          path: 'following',
          element: <Suspense fallback={<div>Loading...</div>}><Following/></Suspense>
        },
        {
          path: 'followers',
          element:<Suspense fallback={<div>Loading...</div>}><Followers/></Suspense>
        },
        {
          path: 'photos',
          element: <Suspense fallback={<div>Loading...</div>}><Photos/></Suspense>
        },
        {
          path: 'notifications',
          element: <Suspense fallback={<div>Loading...</div>}><Notification/></Suspense>
        },
        {
          path: 'profile/:username',
          element:<Suspense fallback={<div>Loading...</div>}><Profile/></Suspense>
        }
      ]
    },
    {
      path: '*',
      element: <Error/>
    }
  ]);

  return routes;
};


export default AppRoutes;
