import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './nav.style.css'
import logo from '../../assets/saurathsabha.png'
import UserContext from '../../context/user'
import FirebaseContext from '../../context/firebase'
import {
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaRupeeSign,
  FaSearch,
  FaHeart,
  FaHome,
  FaUserAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaTimes,
  FaBars,
} from 'react-icons/fa'

const Nav = ({ setIsModal }) => {
  const { user } = useContext(UserContext)
  const { firebaseApp } = useContext(FirebaseContext)
  const [isMenu, setIsMenu] = useState(false)
  const [hamMenu, setHamMenu] = useState(false)

  const handleMenuOff = (e) => {
    if (
      e.target.classList.contains('nav-item') ||
      e.target.classList.contains('btnLogout') ||
      e.target.classList.contains('btnNav')
    ) {
      setHamMenu(false)
    }
  }

  return (
    <nav>
      <div className='container navContainer'>
        <div className='logo'>
          <img src={logo} alt='Logo' />

          {/* <NavLink to='/'>SaurathSabha</NavLink> */}
        </div>
        <div onClick={() => setHamMenu((prev) => !prev)} className='menuBar'>
          {hamMenu ? <FaTimes /> : <FaBars />}
        </div>
        <ul className='nav'>
          <li>
            <NavLink
              className='nav-item'
              exact
              activeClassName='bottomBorder'
              to='/'
            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              activeClassName='bottomBorder'
              className='nav-item'
              to='/search'
            >
              <FaSearch /> Search
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              activeClassName='bottomBorder'
              className='nav-item'
              to='/plans'
            >
              <FaRupeeSign /> Plans
            </NavLink>
          </li>
        </ul>

        {user ? (
          <div className='navUser'>
            <div
              className='navUserDiv'
              onClick={() => setIsMenu((prev) => !prev)}
            >
              <FaUserCircle />
              <p>{user.displayName?.length > 0 && user.displayName}</p>
              {/* {isMenu ? <FaChevronUp /> : <FaChevronDown />} */}

              <FaChevronDown className={isMenu && 'tick'} />
            </div>
            {isMenu && (
              <div onClick={() => setIsMenu(false)} className='overlayMenu'>
                <NavLink
                  activeClassName='bgActive'
                  to={`/profile/${user && user.uid}`}
                >
                  <FaUserAlt /> My Profile
                </NavLink>

                <NavLink activeClassName='bgActive' to={`/notification`}>
                  <FaBell /> Notification
                </NavLink>

                <NavLink activeClassName='bgActive' to={`/favourite`}>
                  <FaHeart /> Favourite
                </NavLink>

                <div
                  className='btnLogout'
                  onClick={() => firebaseApp.auth().signOut()}
                >
                  <FaSignOutAlt /> Logout
                </div>
                <div className='helpline'>
                  HelpLine
                  <span>8527853048</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setIsModal(true)} className='btnNav'>
            <FaSignInAlt /> Login
          </button>
        )}
        {hamMenu && (
          <div className='mobileMenu' onClick={handleMenuOff}>
            <NavLink
              className='nav-item'
              exact
              activeClassName='bottomBorder'
              to='/'
            >
              <FaHome /> Home
            </NavLink>
            <NavLink
              exact
              activeClassName='bottomBorder'
              className='nav-item'
              to='/search'
            >
              <FaSearch /> Search
            </NavLink>

            <NavLink
              exact
              activeClassName='bottomBorder'
              className='nav-item'
              to='/plans'
            >
              <FaRupeeSign /> Plans
            </NavLink>

            {user ? (
              <>
                <NavLink
                  activeClassName='bottomBorder'
                  className='nav-item'
                  to={`/profile/${user && user.uid}`}
                >
                  <FaUserAlt /> My Profile
                </NavLink>

                <NavLink
                  activeClassName='bottomBorder'
                  className='nav-item'
                  to={`/notification`}
                >
                  <FaBell /> Notification
                </NavLink>

                <NavLink
                  activeClassName='bottomBorder'
                  className='nav-item'
                  to={`/favourite`}
                >
                  <FaHeart /> Favourite
                </NavLink>

                <div
                  className='btnLogout'
                  onClick={() => firebaseApp.auth().signOut()}
                >
                  <FaSignOutAlt /> Logout
                </div>
              </>
            ) : (
              <button onClick={() => setIsModal(true)} className='btnNav'>
                <FaSignInAlt /> Login
              </button>
            )}
            <div className='helpline'>
              HelpLine : <span>8527853048</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
