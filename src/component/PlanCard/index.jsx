import React, { useContext, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import UserContext from '../../context/user'
import { showRazorpay } from '../../utils/razorpay'
import toast from 'react-hot-toast'
import './plancard.style.css'
const featureList = [
  'Free Profile Making',
  'Free Match Making',
  'Free Tips',
  'Free Panchang',
  'Online Chatting',
  'Video Profile',
  'Auto Match Making',
  'Data Brust',
  'Background Fact Check',
  'Honeymoon Planning',
  'Personalized Sidhhant',
]

const PlanCard = ({ item, selected, handleSelect, no, plan }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(UserContext)

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await showRazorpay(item.cls, user.displayName, user.phoneNumber, user.uid)
      setIsLoading(false)
    } catch (error) {
      toast.error('Please Try Again Something Went Wrong')
      setIsLoading(false)
      console.error(error)
    }
  }
  return (
    <div className={`planCard ${item.cls}`}>
      <p className='planName'>{item.name}</p>
      <p className='planPrice'>{item.price}</p>

      {!(selected === no) ? (
        <ul className='frontUl'>
          <li>User Profile Making</li>
          <li>View Profile</li>
          <li>Send Connection</li>
          <li>Match Making</li>
          <li>Background Check</li>
        </ul>
      ) : (
        <ul className='detailedUl'>
          {featureList.map((feature, i) =>
            item.fno > i ? (
              <li key={i} className='showTick'>
                <FaCheck />
                {feature}
              </li>
            ) : (
              <li key={i}>
                <FaTimes />
                {feature}
              </li>
            )
          )}
        </ul>
      )}

      <p className='planDuration'>{item.duration}</p>
      <div className='planBtnDiv'>
        <div
          onClick={() => handleSelect(no)}
          className={`viewPlan ${
            item.cls === 'basic' && plan !== 'basic' ? 'viewFull' : ''
          }`}
        >
          {selected === no ? 'Close' : 'View'}
        </div>
        {item.cls === plan ? (
          <div className='planActiveBtn'>Active</div>
        ) : (
          item.cls !== 'basic' && (
            <button
              disabled={isLoading}
              onClick={handleClick}
              className='planBtn'
            >
              {isLoading ? 'Loading' : 'Select Plan'}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default PlanCard
