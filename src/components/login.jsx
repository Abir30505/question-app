import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/menu'); // redirect to courses page after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          password:
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">login</button>
        <p>
          don't have account? <Link to="/signup">signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;