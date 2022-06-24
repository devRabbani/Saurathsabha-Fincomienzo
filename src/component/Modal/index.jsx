import './Modal.style.css'
import { FaTimes } from 'react-icons/fa'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const cardVariants = {
  hidden: { y: '-100vh' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 13, delay: 0.4 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
}

const Modal = ({ setIsModal, children }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backDrop')) {
      setIsModal(false)
    }
  }
  return (
    <div
      onClick={handleClick}
      className='backDrop'
      variants={backdropVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className='modalCard' variants={cardVariants}>
        <span className='cancelIcon' onClick={() => setIsModal(false)}>
          <FaTimes />
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal
