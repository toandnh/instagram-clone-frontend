import './App.css'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'

import { modalOpened } from './components/features/modal/modalSlice'

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
  const modal = useSelector(modalOpened)

  const location = useLocation()
  console.log(location, location.state?.background)

  const [background, setBackground] = useState(location.state?.background)

  useEffect(() => {
    if ((location.state?.background && !modal) || location.pathname.split('/')[1] !== 'posts') //better to set modal to false?
      setBackground(null)
    else if (location.state?.background)
      setBackground(location.state.background)
    // eslint-disable-next-line
  }, [location.state?.background, modal])

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

      {modal && (
        <Routes>
          <Route path='posts/:postId' element={<Modal />} />
        </Routes>
      )}
    </div>
  )
}

export default App
