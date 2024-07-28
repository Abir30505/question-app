import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/menu'); // redirect to courses page after successful sign up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          password:
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;