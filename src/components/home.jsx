import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home-container'>
      <div className='home-content'>
        <h1>Welcome to Quiz App!</h1>
        <h2>Register to enjoy all the features</h2>
        <p>Knowledge is power, and we're here to help you unleash it. Our quiz app is designed to test your knowledge, challenge your mind, and keep you entertained.</p>
        <p>From history to science, literature to music, our quizzes cover a wide range of topics. Whether you're a student looking to improve your grades, a professional seeking to expand your knowledge, or simply someone who loves to learn, we've got you covered.</p>
        <h3>Why Quiz App?</h3>
        <ul>
          <li>Improve your knowledge and skills</li>
          <li>Compete with others and track your progress</li>
          <li>Access a vast library of quizzes and questions</li>
          <li>Get instant feedback and analysis</li>
        </ul>
        <p>So what are you waiting for? Register now and start quizzing your way to knowledge and success!</p>
        <button><Link to='/signup'>Register Now</Link></button>
      </div>
    </div>
  )
}

export default Home