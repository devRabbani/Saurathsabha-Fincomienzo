import React from 'react'
import UserCard from '../UserCard'
import './searchcardlist.style.css'

const SearchCardList = ({ data, fetchData }) => {
  return (
    <>
      <h2 className='userCount'>Users Found ({data.length})</h2>
      <p onClick={fetchData} className='alluserBtn'>
        show all users
      </p>
      {!data.length && <p className='noUsers'>No Users Found</p>}
      <div className='searchCardList'>
        {data.length > 0 &&
          data.map((item, i) => <UserCard key={i} item={item} />)}
      </div>
    </>
  )
}

export default SearchCardList
