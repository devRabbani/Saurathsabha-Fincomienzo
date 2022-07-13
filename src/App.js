import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Nav from './component/Nav'
import Footer from './component/Footer'
import Signup from './pages/Signup'
import Search from './pages/Search'
import Profile from './pages/Profile'
import UserContext from './context/user'
import useAuthListener from './hooks/useAuthListner'
import ProtectedRoute from './utils/protected.route'
import Plans from './pages/plans'
import ModalContext from './context/modal'
import Additional from './pages/additional'
import ServiceRegister from './pages/serviceRegister'
import Favourite from './pages/favourite'
import Notification from './pages/notification'
import usePlanListener from './hooks/usePlanListner'
import { Toaster } from 'react-hot-toast'
import ShidhantSignup from './pages/shidhantSignup'

function App() {
  const { user } = useAuthListener()
  const plan = usePlanListener(user?.uid)
  const [isModal, setIsModal] = useState(false)
  const location = useLocation()
  // useEffect(() => {
  //   if (isModal) {
  //     document.body.style.overflowY = 'hidden'
  //   } else {
  //     document.body.style.overflowY = 'unset'
  //   }
  // }, [isModal])

  return (
    <UserContext.Provider value={{ user, plan }}>
      <ModalContext.Provider value={{ isModal, setIsModal }}>
        {location.pathname !== '/signup' && (
          <Nav setIsModal={setIsModal} user={user} />
        )}

        <Toaster />
        <div className='pageBody'>
          <Switch>
            <Route exact path='/'>
              <HomePage isModal={isModal} setIsModal={setIsModal} />
            </Route>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/service/register' component={ServiceRegister} />
            <Route exact path='/shidhant/signup' component={ShidhantSignup} />
            <ProtectedRoute user={user} path='/search' exact>
              <Search />
            </ProtectedRoute>
            <ProtectedRoute user={user} exact path='/profile/:uid'>
              <Profile />
            </ProtectedRoute>
            {/* <ProtectedRoute
              user={user}
              exact
              path='/edit/additional'
              pathname='/edit/additional'
            >
              <EditAdditional />
            </ProtectedRoute> */}
            <ProtectedRoute exact user={user} path='/favourite'>
              <Favourite />
            </ProtectedRoute>
            <ProtectedRoute user={user} path='/plans'>
              <Plans />
            </ProtectedRoute>
            <ProtectedRoute user={user} path='/notification'>
              <Notification />
            </ProtectedRoute>
            <ProtectedRoute user={user} path='/additional'>
              <Additional />
            </ProtectedRoute>
          </Switch>
        </div>
        <p className='footerBottom'>
          Saurath Sabha Inc © 2021 All rights are reserved.
        </p>
        {/* {isModal && (
        <Modal setIsModal={setIsModal}>
          <LoginModal />
        </Modal>
      )} */}
      </ModalContext.Provider>
    </UserContext.Provider>
  )
}

export default App
