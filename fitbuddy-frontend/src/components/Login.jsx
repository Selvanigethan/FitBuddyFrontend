import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';
import logo from '../assets/images/fitbuddy.png';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
  
      const { username, token, message } = response.data;
  
      if (message !== 'User logged in successfully.') {
        setErrorMessage(message);
      } else {
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        navigate('/home');
      }
  
    } catch (error) {
      console.error('Login error:', error);
  
      // Check if there's a response and extract the error message
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during login. Please try again!');
      }
    }
  };  

  return (
<div className="container verify-container">
  <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="col-md-5 register-content" data-aos="fade">
        <form onSubmit={handleSubmit} className="bg-white" style={{ marginTop: '5px' }}>
          
          {/* App Logo */}
          <div className="text-center mb-4">
            <img src={logo} alt="FitBuddy Logo" className="rounded-circle" style={{ width: '180px', height: '180px' }} />
          </div>
          
          {/* Error Messages */}
          {errorMessage && (
            <div className="error-message">
              <span>{errorMessage}</span>
                <button className="close-btn" onClick={() => setErrorMessage('')}>
                &times;
                </button>
            </div>
          )}
          <br/>

          {/* Form Fields */}
          <div className="row form-group">
            <div className="col-md-12">
              <label className="text-black" htmlFor="username">Username</label>
              <input type="text" id="username" className="form-control" name='username' 
              // autoComplete='off'
              value={formData.username}
              onChange={handleChange}
              required/>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-12">
              <label className="text-black" htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" name="password"
              value={formData.password}
              onChange={handleChange}
              required/>
            </div>
          </div>
          
          <p>Forgot your password? <a href='/'>click here</a></p>

          {/* Submit Button */}
          <div className="row form-group">
            <div className="col-md-12 text-center">
              <input type="submit" value="LOGIN" className="btn btn-pill btn-primary btn-md text-white" style={{ width: '380px' }}/>
            </div>
          </div>

          <p>Don't have an account? <a href="/register">Create Account</a></p>

        </form>
      </div>
    </div>
  </div>

  );

};

export default Login;