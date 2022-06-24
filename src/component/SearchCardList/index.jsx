import React from 'react'
import UserCard from '../UserCard'
import './searchcardlist.style.css'

const SearchCardList = ({ data }) => {
  return (
    <div className='searchCardList'>
      {data.length > 0 &&
        data.map((item, i) => <UserCard key={i} item={item} />)}
    </div>
  )
}

export default SearchCardList
