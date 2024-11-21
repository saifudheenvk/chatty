import { FC, useState } from "react";
import backgroundImage from "../../../assets/images/background.jpg";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { Link, useSearchParams } from "react-router-dom";
import { authService } from "../../../services/api/auth/auth.service";
import { FaArrowLeft } from "react-icons/fa";
import "./ResetPassword.scss";

const ResetPassword: FC = () => {

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [altertType, setAlertType] = useState<string>('alert-error');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const [params] = useSearchParams();

  const resetPassword = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const result = await authService.resetPassword({
        password,
        confirmPassword
      }, params.get('token') as string);
      setPassword('');
      setConfirmPassword('');
      setAlertType('alert-success');
      setResponseMessage(result?.data?.message);
      setShowAlert(false);
    } catch (error: any) {
      setAlertType('alert-error');
      setResponseMessage(error?.response?.data?.message ?? 'Something went wrong');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="container-wrapper">
        <div className="environment">DEV</div>
        <div className="container-wrapper-auth">
          <div className="tabs reset-password-tabs" style={{ height: `${responseMessage ? '400px' : ''}` }}>
            <div className="tabs-auth">
              <ul className="tab-group">
                <li className='tab'>
                  <div className="login reset-password">Reset Password</div>
                </li>
              </ul>
              <div className="tab-item">
                <div className="auth-inner">
                  {
                    responseMessage && (
                      <div className={`alerts ${altertType}`} role="alert">
                        {responseMessage}
                      </div>
                    )
                  }
                  <form className="reset-password-form" onSubmit={resetPassword}>
                    <div className="form-input-container">
                      <Input
                        style={{ border: `${showAlert ? '1px solid #fa9b8a' : ''}` }}
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        labelText="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        style={{ border: `${showAlert ? '1px solid #fa9b8a' : ''}` }}
                        name="confirmPassword"
                        placeholder="Enter your password"
                        type="password"
                        labelText="Confirm Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      label={`${loading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`}
                      className="auth-button button"
                      disabled={!password || !confirmPassword || loading}
                    />
                    <Link to={'/'}>
                      <span className="login">
                        <FaArrowLeft className="arrow-left" /> Back to Login
                      </span>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
