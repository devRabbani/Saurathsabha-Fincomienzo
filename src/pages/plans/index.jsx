import React from 'react'
import { useState } from 'react'
import PlanCard from '../../component/PlanCard'

import useTitle from '../../hooks/useTitle'
import useTop from '../../hooks/useTop'

const plansList = [
  {
    name: 'Basic',
    cls: 'basic',
    fno: 1,
    price: '₹ 0',
    duration: 'Unlimited',
    features: ['Free Profile Making'],
  },
  {
    name: 'Silver',
    cls: 'silver',
    fno: 2,
    price: '₹ 2100',
    duration: '3 Months',
    features: ['Free Match Making'],
  },
  {
    name: 'Gold',
    cls: 'gold',
    fno: 4,
    price: '₹ 3100',
    duration: '6 Months',
    features: ['Free Tips', 'Free Panchang'],
  },
  // {
  //   name: 'Diamond',
  //   price: '4100₹',
  //   duration: '12 Months',
  //   features: ['Online Chatting', 'Video Profile'],
  // },
  {
    name: 'Platinum',
    cls: 'platinum',
    price: '₹ 11000',
    fno: 9,
    duration: 'Life Membership',
    features: [
      'Auto Match Making',
      'Data Brust',
      'Background Fact Check',
      'Honeymoon Planning',
    ],
  },
  {
    name: 'Personalised',
    cls: 'personalised',
    price: '₹ 51000',
    fno: 11,
    duration: 'Customised',
    features: ['Personalized Sidhhant'],
  },
  // {
  //   name: 'Platinum',
  //   price: '11000₹',
  //   duration: 'Life Membership',
  //   features: [
  //     'Free Profile Making',
  //     'Free Match Making',
  //     'Free Tips',
  //     'Free Panchang',
  //     'Online Chatting',
  //     'Video Profile',
  //     'Auto Match Making',
  //     'Data Brust',
  //     'Background Fact Check',
  //     'Honeymoon Planning',
  //     'Personalized Sidhhant',
  //   ],
  // },
]

const Plans = () => {
  useTop()
  useTitle('Plans | SaurathSabha')

  const [selected, setSelected] = useState(null)
  const handleSelect = (i) => {
    if (selected === i) {
      setSelected(null)
    } else {
      setSelected(i)
    }
  }

  return (
    <div className='planPage'>
      <div className='container pageBody'>
        <h1 className='pageHeading'>Plans</h1>
        <div className='planWrapper'>
          {plansList.map((item, i) => (
            <PlanCard
              key={i}
              item={item}
              selected={selected}
              no={i}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Plans
