import React, { createContext, useState, useEffect } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './components/signup'
import Navbar from './components/navbar'
import Login from './components/login'
import Quiz from './components/quiz'
import { auth } from './firebase'
import './App.css'
import Mcq from './components/mcq/mcq'
import AddMcq from './components/mcq/addmcq'
import Menu from './components/menu'
import Home from './components/home'

const AuthContext = createContext()

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/signUp' element={<Signup/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/quiz' element={user ? <Quiz/> : <Navigate to="/login" replace />}></Route>
          <Route path='/mcq' element={user ? <Mcq/> : <Navigate to="/login" replace />}></Route>
          <Route path='/addmcq' element={user ? <AddMcq/> : <Navigate to="/login" replace />}></Route>
          <Route path='/menu' element={user ? <Menu/> : <Navigate to="/login" replace />}></Route>
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App