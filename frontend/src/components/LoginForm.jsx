import React from 'react';
import axios from 'axios';

function LoginForm() {
  const handleGoogleLogin = () => {
    axios
      .get('http://localhost:5000/auth/google')
      .then((response) => {
        window.location.href = response.data.authUrl;
      })
      .catch((error) => {
        console.log('chi 9lwa')
        console.error('Error initiating Google login:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Connect with Google</button>
    </div>
  );
}

export default LoginForm;
