import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user'
// import useUser from '../../hooks/useUser'
import { checkFav, addToFav, removeFav } from '../../utils/firebase'
import { FaHeart, FaHourglassHalf } from 'react-icons/fa'

const UserCard = ({ item }) => {
  const { user } = useContext(UserContext)
  // const userData = useUser(user.uid);
  const [isLoading, setIsLoading] = useState(true)
  const [isHeart, setIsHeart] = useState(false)
  const { uid } = user

  const handleClick = async () => {
    setIsLoading(true)
    setIsHeart((prev) => !prev)
    if (!isHeart) {
      await addToFav(
        uid,
        item.userId,
        item.name,
        item.profileUrl,
        item.age,
        item.city,
        item.employement
      )
    } else {
      await removeFav(uid, item.userId)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await checkFav(uid, item.userId)
      setIsHeart(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='searchUserCard'>
      <button disabled={isLoading} onClick={handleClick} className='heart'>
        {isLoading ? (
          <FaHourglassHalf color='grey' />
        ) : (
          <FaHeart color={isHeart ? 'red' : 'grey'} />
        )}
      </button>
      <img src={item.profileUrl} alt='user pic' />
      <h2>{item.name}</h2>
      <p>
        Age : {item.age} | City : {item.city}
        <br />
        Employement : {item.employement}
      </p>

      {/* <div className="btnDiv">
        <button
          onClick={() =>
            addToConnect(
              uid,
              userData.name,
              userData.profileUrl,
              item.userId,
              item.name,
              item.profileUrl
            )
          }
          className="connectBtn"
        >
          Connect
        </button>
        <button
          onClick={() =>
            addToFav2(uid, item.userId, item.name, item.profileUrl)
          }
        >
          Add to Favorite
        </button>
      </div> */}
      <Link to={`/profile/${item.userId}`} className='viewBtn'>
        View Profile
      </Link>
    </div>
  )
}

export default UserCard
