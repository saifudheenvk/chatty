import { useAppDispatch, useAppSelector } from "@hooks/redux";
import useEffectOnce from "@hooks/useEffectOnce";
import useLocalStorage from "@hooks/useLocalStorage";
import useSessionStorage from "@hooks/useSessionStorage";
import { addUser } from "@redux/reducers/user/user.reducer";
import { authService } from "@services/api/auth/auth.service";
import { userService } from "@services/api/user/user.service";
import { IUserDocument } from "@services/utils/types/user";
import { Utils } from "@services/utils/utils.service";
import { FC, useCallback, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";


interface IProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRoute> = ({children}) => {

  const [userData, setUserData] = useState<IUserDocument | null>(null);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const keepLoggedIn = useLocalStorage('keepLoggedIn', 'get');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const pageReload = useSessionStorage('pageReload', 'get');
  const [deleteSessionPageReload] = useSessionStorage('pageReload', 'delete');
  const [deleteStorageUsername] = useLocalStorage('username', 'delete');
  const { profile, token } = useAppSelector((state) => state.user);

  const checkUser = useCallback(async () => {
    try {
      const response = await userService.checkCurrentUser();
      setUserData(response.data.user);
      setTokenIsValid(true)
      dispatch(addUser({ token: response.data.token, profile: response.data.user }));
    } catch (error) {
      setTokenIsValid(false);
      setTimeout(async () => {
        Utils.clearStore( dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn );
        await authService.signOut();
        navigate('/');
      }, 1000);
    }
  }, [dispatch, navigate, deleteSessionPageReload, deleteStorageUsername, setLoggedIn]);

  useEffectOnce(() => {
    checkUser();
  });

  if (keepLoggedIn || (!keepLoggedIn && userData) || (profile && token) || pageReload) {
    if (!tokenIsValid) {
      return <></>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <>{<Navigate to="/" />}</>;
  }
}

export default ProtectedRoute;
