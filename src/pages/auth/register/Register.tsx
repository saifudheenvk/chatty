import { FC, useEffect, useState } from "react"
import './Register.scss';
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { authService } from "@services/api/auth/auth.service";
import { IUserDocument } from "@services/utils/types/user";
import { Utils } from "@services/utils/utils.service";


const Register: FC = () => {

  const [hasError, setHasError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [altertType, setAlertType] = useState<string>('alert-error');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<IUserDocument | null>(null);

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
      setUser(result.data.user);
      //set loggedin true
      // set user to localstorage
      // dispatch user to redux
      setAlertType('alert-success');
      setHasError(false);
      setTimeout(() => {
        window.location.href = '/';
      })
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
      setLoading(false);
    }
  }, [user, loading]);

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
