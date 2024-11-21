import { FC, useState } from 'react';
import './AuthTabs.scss';
import backgroundImage from '../../../assets/images/background.jpg';
import { Login, Register } from '../index';

const AuthTabs: FC = () => {

  const [ type, setType ] = useState<string>('Sign In');

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="container-wrapper">
        <div id='content' className="environment">DEV</div>
        <div className="container-wrapper-auth">
          <div className="tabs">
            <div className="tabs-auth">
              <ul className="tab-group">
                <li className={`tab ${type === 'Sign In' ? 'active' : ''}`} onClick={() => setType('Sign In')}>
                  <button className="login">Sign In</button>
                </li>
                <li className={`tab ${type === 'Sign Up' ? 'active' : ''}`} onClick={() => setType('Sign Up')}>
                  <button className="signup">Sign Up</button>
                </li>
              </ul>
              {
                type === 'Sign In' ? <div className="tab-item">
                  <Login />
                </div> : <div className="tab-item">
                  <Register />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthTabs;
