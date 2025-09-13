import React from 'react';
import "../login/Login.css";
import { FaUserAlt, FaMobile, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import alreemlogo from "../../../public/logos/alreem-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your validation/authentication logic here
    navigate('/dashboard');
  };

  return (
    <div className='login-container'>
      <div className="login-left-side"></div>
      
      <div className="login-right-side">
        <div className="alreem-logo">
          <img src={alreemlogo} alt="alreem-logo" />
        </div>
        
        <div className="alreem-login">
          <div className="alreem-login-heading">
            <h2>Login</h2>
            <p>Please fill your information below</p>
          </div>
          
          <div className="login-inputs">
            <div className="input-with-icon">
              <FaUserAlt className="input-icon" />
              <input type="text" placeholder='Name' />
            </div>
            <div className="input-with-icon">
              <FaMobile className="input-icon" />
              <input type="tel" placeholder='Mobile number' />
            </div>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder='E-mail' />
            </div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
