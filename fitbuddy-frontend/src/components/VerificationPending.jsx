import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/VerificationPending.css';
import logo from '../assets/images/fitbuddy.png';

function VerificationPending() {
  return (

<div className="container verify-container">
  <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="col-md-6 verify-content" data-aos="fade">
      {/* App Logo */}
      <div className="text-center mb-4">
        <img src={logo} alt="FitBuddy Logo" className="rounded-circle" />
      </div>

      <h2 className="text-center">Verify Your Email</h2>
      <p className="text-center">
        We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
      </p>
      <p className="text-center">
        After verifying, you can <Link to="/login" className="verify-link">login here</Link>.
      </p>
      <p className="text-center">
        If you didn't receive the email, check your spam folder or <Link to="/resend-verification" className="verify-link">resend verification email</Link>.
      </p>
    </div>
  </div>
</div>

  
  );
}

export default VerificationPending;
