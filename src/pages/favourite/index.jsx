import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../component/Loader'
import UserContext from '../../context/user'
import useTitle from '../../hooks/useTitle'
import useTop from '../../hooks/useTop'
import { getFavList } from '../../utils/firebase'
import roles from '../../utils/roles'
import './favourite.style.css'
import toast from 'react-hot-toast'

const Favourite = () => {
  useTop()
  useTitle('Favourite | SaurathSabha')
  const [userList, setUserLists] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { user, plan } = useContext(UserContext)
  const isPhoto = roles[plan?.plan]?.photo
  const isView = roles[plan?.plan]?.view

  const handleView = (e) => {
    if (!isView) {
      e.preventDefault()
      toast.error('Upgrad your plan to view profile')
      return
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await getFavList(user?.uid)
      setUserLists(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='container pageBody'>
      <h1 className='pageHeading'>Favourite List</h1>
      {isLoading ? (
        <Loader dark={true} />
      ) : userList.length ? (
        <div className='favListWrapper'>
          {userList.map((item, i) => (
            <div key={i} className='favCard'>
              <img
                src={isPhoto ? item.profileUrl : '/noimage.png'}
                alt='User Pic'
              />
              <div className='favInfo'>
                <h2>{item.name}</h2>
                <p>
                  Age : {item.age} | City : {item.city}
                  <br />
                  Employement : {item.employement}
                </p>
                <Link onClick={handleView} to={`/profile/${item.userId}`}>
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='favListEmpty'>List is empty try to add some users</p>
      )}
    </div>
  )
}

export default Favourite
