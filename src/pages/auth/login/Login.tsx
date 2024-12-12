import { FC, useEffect, useState } from "react";
import './Login.scss';
import Input from "@components/input/Input";
import { FaArrowRight} from "react-icons/fa";
import Button from "@components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@services/api/auth/auth.service";
import { IUserDocument } from "@services/utils/types/user";
import { useAppDispatch } from "@hooks/redux";
import useLocalStorage from "@hooks/useLocalStorage";
import useSessionStorage from "@hooks/useSessionStorage";
import { Utils } from "@services/utils/utils.service";

const Login: FC = () => {

  const [hasError, setHasError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [altertType, setAlertType] = useState<string>('alert-error');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<IUserDocument | null>(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');

  const loginUser = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const result = await authService.signIn({
        username,
        password
      })
      setLoggedIn(keepLoggedIn);
      setStoredUsername(username);
      setAlertType('alert-success');
      setHasError(false);
      Utils.dispatchUser(result, pageReload, dispatch, setUser);
    } catch (error: any) {
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(loading && !user) return;
    if(user) {
      navigate('/app/social/streams');
    }
  }, [user, loading, navigate]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${altertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={loginUser}>
          <div className="form-input-container">
              <Input
                name="username"
                style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                placeholder="Enter your username"
                type="text"
                labelText="Username"
                id="username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
                />
              <Input
                name="password"
                style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                placeholder="Enter your password"
                type="password"
                labelText="Password"
                id="password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                />
              <label className="checkmark-container" htmlFor="checkbox">
              <Input
                id="checkbox"
                name="checkbox"
                type="checkbox"
                value={keepLoggedIn}
                handleChange={() => setKeepLoggedIn(prev => !prev)}
                />
                  Keep me signed in
              </label>
          </div>
          <Button
            className="auth-button button"
            label={`${loading ? 'SIGNIN IN PROGRESS...' : 'SIGNIN'}`}
            disabled={loading || !username || !password}
            />

          <Link to={'/forgot-password'}>
            <span className="forgot-password">
                Forgot password? <FaArrowRight />
            </span>
          </Link>
      </form>
    </div>
  );
}

export default Login;
