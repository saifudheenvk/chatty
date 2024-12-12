import { FC, useEffect, useState } from "react"
import './Register.scss';
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { authService } from "@services/api/auth/auth.service";
import { IUserDocument } from "@services/utils/types/user";
import { Utils } from "@services/utils/utils.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux";
import useLocalStorage from "@hooks/useLocalStorage";
import useSessionStorage from "@hooks/useSessionStorage";


const Register: FC = () => {

  const [hasError, setHasError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [altertType, setAlertType] = useState<string>('alert-error');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<IUserDocument | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');

  const registerUser = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const avatarColor  = Utils.getAvatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });
      setLoggedIn(true);
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
    <form className="auth-form" onSubmit={registerUser}>
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
                name="email"
                style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                placeholder="Enter your email"
                type="text"
                labelText="Email"
                id="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
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
        </div>
        <Button
          className="auth-button button"
          label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
          disabled={loading || !username || !password || !email}
          />
    </form>
</div>
  )
}

export default Register
