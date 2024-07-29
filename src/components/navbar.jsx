// Navbar.js
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './navbar.css'
import { auth } from '../firebase';

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  function logout(){
    auth.signOut().then(() => {
      console.log('User signed out');
      navigate('/', { replace: true });
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  return (
    <div className='nav-container'> 
     { auth.currentUser ? <> <Link to='/mcq'>question</Link>
      <Link to='/addmcq'>add question</Link>
      <Link to='/quiz'>Play-Quiz</Link>
      <Link to= '/dashboard'>Dashboard</Link>
      <button className='button' onClick={logout}>log out</button>
      </>:<> <Link to='/signup' className={location.pathname === '/signup' ? 'active' : ''}>Register</Link>
      </>}
    </div>
  )
}

export default Navbar