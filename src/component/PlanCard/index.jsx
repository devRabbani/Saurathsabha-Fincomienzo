import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
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

const PlanCard = ({ item, selected, handleSelect, no }) => {
  // const [btnClick, setBtnClick] = useState(false)

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
        <div onClick={() => handleSelect(no)} className='viewPlan'>
          {selected === no ? 'Close' : 'View'}
        </div>
        <div className='planBtn'>Select Plan</div>
      </div>
    </div>
  )
}

export default PlanCard
