// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ProfilePage from './pages/Profiles/Profile-Page'
import Book from './pages/Book/Book'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileServices from './services/profileService'
// styles
import './App.css'
import SearchPage from './pages/SeachPage/Search-Page'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [profile,setProfile] = useState()

  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  

  useEffect(()=>{
      const profileGrab = async() =>{
        const profileData = await profileServices.fetchProfile(user.profile)
        setProfile(profileData)
      }
      if(user&&!profile) profileGrab()
  },[user,profile])

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route 
          path={`/profiles/:id`}
          element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user}/>
            </ProtectedRoute>
            }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute user={user}>
              <SearchPage user={user}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/books/:id"
          element={
            <ProtectedRoute user={user}>
              <Book />
            </ProtectedRoute>
          }/>
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
