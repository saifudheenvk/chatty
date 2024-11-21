import { FC, useState } from "react"
import backgroundImage from "../../../assets/images/background.jpg";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import "./ForgotPassword.scss";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { authService } from "../../../services/api/auth/auth.service";



const ForgotPassword: FC = () => {

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [altertType, setAlertType] = useState<string>('alert-error');
  const [showAlert, setShowAlert] = useState<boolean>(false);


  const forgotPassword = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const result = await authService.forgotPassword(email);
      setEmail('');
      setResponseMessage(result?.data?.message);
      setAlertType('alert-success');
      setShowAlert(false);
    } catch (error: any) {
      setShowAlert(true);
      setAlertType('alert-error');
      setResponseMessage(error?.response?.data?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="container-wrapper">
        <div className="environment">DEV</div>
        <div className="container-wrapper-auth">
          <div className="tabs forgot-password-tabs" style={{ height: `${responseMessage ? '300px' : ''}` }}>
            <div className="tabs-auth">
              <ul className="tab-group">
                <li className='tab'>
                  <div className="login forgot-password">Forgot Password</div>
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
                <form className="forgot-password-form" onSubmit={forgotPassword}>
                    <div className="form-input-container">
                        <Input
                          name="email"
                          style={{ border: `${showAlert ? '1px solid #fa9b8a' : ''}` }}
                          placeholder="Enter your email"
                          type="email"
                          labelText="Email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button
                      label={`${loading ? 'FORGOT PASSWORD IN PROGRESS...' : 'FORGOT PASSWORD'}`}
                      className="auth-button button"
                      disabled={!email}
                      />
                    <Link to={'/'}>
                      <span className="login">
                        <FaArrowLeft className="arrow-left" /> Back to Login?
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

export default ForgotPassword
