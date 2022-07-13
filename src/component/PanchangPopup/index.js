import './panchang.style.css'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

const shidhantVariant = {
  initial: {
    scale: 0.97,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    backgroundColor: ['#f54242', '#e65555', '#f54242'],
    transition: {
      scale: { yoyo: Infinity },
      backgroundColor: { yoyo: Infinity },
    },
  },
}

export default function PanchangPopup({ handleClick }) {
  const history = useHistory()

  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={shidhantVariant}
      className='panchangWrapper'
    >
      <p>Try our Online Siddhant Services</p>
      <div className='btnWrapper'>
        <button onClick={() => history.push('/shidhant/signup')}>Try It</button>
        <button onClick={handleClick}>No Thanks</button>
      </div>
    </motion.div>
  )
}
