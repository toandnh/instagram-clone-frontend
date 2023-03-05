import './App.css'

import { Routes, Route, useLocation } from 'react-router-dom'

import PersistLogin from './components/auth/persistLogin'
import LogoutListener from './components/auth/logoutListener'
import Prefectch from './components/auth/prefetch'

import Login1 from './components/pages/login/login1'
import Login2 from './components/pages/login/login2'
import Signup from './components/pages/signup/signup'
import Home from './components/pages/home/home'
import Explore from './components/pages/explore/explore'
import Reels from './components/pages/reels/reels'
import Messages from './components/pages/messages/messages'
import Profile from './components/pages/profile/profile'

import UserPage from './components/page-components/users/userPage'
import Modal from './components/layout/modal'


function App() {
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <div className='App'>
      <Routes location={background || location}>
        <Route path='login/' element={<Login1 />} />

        <Route path='login-alt/' element={<Login2 />} />

        <Route path='signup/' element={<Signup />} />

        <Route element={<PersistLogin />}>
          <Route element={<LogoutListener />}>
            <Route element={<Prefectch />}>
              <Route path='/' element={<Home />}>
                <Route path='explore/' element={<Explore />} />

                <Route path='reels/' element={<Reels />} />

                <Route path='messages/' element={<Messages />} />

                <Route path='profile/' element={<Profile />}>
                  <Route path=':userId/' element={<UserPage />} />
                </Route>

                <Route path='posts/:postId' element={<Modal />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path='posts/:postId' element={<Modal />} />
        </Routes>
      )}
    </div>
  )
}

export default App
