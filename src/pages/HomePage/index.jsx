import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import About from '../../component/About'
import HeroSection from '../../component/HeroSection'
import LoginModal from '../../component/LoginModal'
import Modal from '../../component/Modal'
import PlanSection from '../../component/planSection'
import Services from '../../component/Services'
import TestimonyGrid from '../../component/TestimonyGrid'
import WhyUs from '../../component/WhyUs'
import UserContext from '../../context/user'
import useTop from '../../hooks/useTop'
import './homepage.style.css'

const HomePage = ({ isModal, setIsModal }) => {
  useTop()

  const { user } = useContext(UserContext)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (isModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'
    }
  }, [isModal])

  console.log(history.action, history)
  useEffect(() => {
    if (location?.state?.modal && history?.action === 'REPLACE') {
      setIsModal(location.state.modal)
    }
  }, [location])

  // useEffect(() => {
  //   const result = getUserByUid(user.uid)
  //   console.log(result)
  // }, [])

  return (
    <>
      <HeroSection />
      <WhyUs />
      {/* <Featured /> */}
      <About />
      <Services />

      <TestimonyGrid />
      <PlanSection />
      {/* <Testimony /> */}
      {!user && isModal && (
        <Modal setIsModal={setIsModal}>
          <LoginModal />
        </Modal>
      )}
    </>
  )
}

export default HomePage
