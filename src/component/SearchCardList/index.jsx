import React, { useContext } from 'react'
import UserContext from '../../context/user'
import roles from '../../utils/roles'
import UserCard from '../UserCard'
import './searchcardlist.style.css'

const SearchCardList = ({ data, fetchData }) => {
  const { plan } = useContext(UserContext)

  return (
    <>
      <h2 className='userCount'>Users Found ({data.length})</h2>
      <p onClick={fetchData} className='alluserBtn'>
        show all users
      </p>
      {!data.length && <p className='noUsers'>No Users Found</p>}
      <div className='searchCardList'>
        {data.length > 0 &&
          data.map((item, i) => (
            <UserCard
              key={i}
              item={item}
              isPhoto={roles[plan?.plan]?.photo}
              isView={roles[plan?.plan]?.view}
            />
          ))}
      </div>
    </>
  )
}

export default SearchCardList
