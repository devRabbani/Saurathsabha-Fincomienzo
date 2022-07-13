import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import About from '../../component/About'
import Footer from '../../component/Footer'
import HeroSection from '../../component/HeroSection'
import LoginModal from '../../component/LoginModal'
import Modal from '../../component/Modal'
import PanchangPopup from '../../component/PanchangPopup'
import PlanSection from '../../component/planSection'
import Services from '../../component/Services'
import TestimonyGrid from '../../component/TestimonyGrid'
import WhyUs from '../../component/WhyUs'
import UserContext from '../../context/user'
import useTitle from '../../hooks/useTitle'
import useTop from '../../hooks/useTop'
import './homepage.style.css'

const HomePage = ({ isModal, setIsModal }) => {
  useTop()
  useTitle('Home | SaurathSabha')
  const { user } = useContext(UserContext)
  const location = useLocation()
  const history = useHistory()
  const [isShidhant, setIsShidhant] = useState(false)
  const [isClicked, setIsClicked] = useState(
    JSON.parse(sessionStorage.getItem('clicked')) || false
  )

  const handleClick = () => {
    setIsShidhant(false)
    setIsClicked(true)
    sessionStorage.setItem('clicked', 'true')
  }

  useEffect(() => {
    if (isModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'
    }
  }, [isModal])

  useEffect(() => {
    if (location?.state?.modal && history?.action === 'REPLACE') {
      setIsModal(location.state.modal)
    }
  }, [location])

  useEffect(() => {
    if (!isClicked) {
      setTimeout(() => {
        setIsShidhant(true)
      }, 5000)
    }
  }, [])

  return (
    <>
      <HeroSection />
      <WhyUs />
      {/* <Featured /> */}
      <About />
      <Services />

      <TestimonyGrid />
      <PlanSection />
      <Footer />
      {/* <Testimony /> */}
      {isShidhant && <PanchangPopup handleClick={handleClick} />}
      {!user && isModal && (
        <Modal setIsModal={setIsModal}>
          <LoginModal />
        </Modal>
      )}
    </>
  )
}

export default HomePage
