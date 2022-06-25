import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchCardList from '../../component/SearchCardList'
import UserContext from '../../context/user'
import useTitle from '../../hooks/useTitle'
import { fetchAllUsers, fetchFilterData } from '../../utils/firebase'
import roles from '../../utils/roles'
import './search.style.css'
import toast from 'react-hot-toast'

const Search = () => {
  useTitle('Search | SaurathSabha')

  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(data)
  const [searchName, setSearchName] = useState('')
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearched, setIsSearched] = useState(false)
  const { user, plan } = useContext(UserContext)

  const isSearch = roles[plan?.plan]?.search
  const isSFilter = roles[plan?.plan]?.social
  const isVFilter = roles[plan?.plan]?.video
  const location = useLocation()
  const redirState = location?.state

  const [filters, setFilters] = useState({
    age: redirState?.age || '',
    employement: redirState?.emp || '',
    profileFor: redirState?.pfor || '',
    city: redirState?.city || '',
    gender: redirState?.gender || '',
    isSocial: redirState?.isSocial || '',
    isVideo: '',
  })

  const { age, employement, profileFor, city, gender, isSocial, isVideo } =
    filters

  // const searchString = location.state

  const fetchData = async () => {
    setIsLoading(true)
    setIsSearched(false)
    setSearchName('')
    const result = await fetchAllUsers(user?.uid)
    setIsLoading(false)
    setData(result)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSearchString = (e) => {
    if (e.target.value === '') {
      fetchData()
      return
    }
    setSearchName(e.target.value)
  }

  const searchByName = () => {
    if (!isSearch) {
      toast.error('Upgrade your plane to search')
      return
    }
    if (searchName !== '') {
      const newData = data.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      )
      setFilterData(newData)
      setIsSearched(true)
    } else {
      setFilterData(data)
      setIsSearched(false)
    }
  }

  const handleFilter = async () => {
    setIsBtnLoading(true)
    if (!isSearch) {
      toast.error('Upgrade your plane to search')
    } else if (!isSFilter && isSocial) {
      toast.error('Upgrade plane to search by social')
    } else if (!isVFilter && isVideo) {
      toast.error('Upgrade plane to search by video')
    } else {
      try {
        const result = await fetchFilterData(
          age,
          city.trim().toLowerCase(),
          employement,
          profileFor,
          gender,
          isSocial,
          isVideo,
          user?.uid
        )
        setData(result)
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
    setIsBtnLoading(false)
  }

  const handleReset = () => {
    try {
      setFilters({
        age: '',
        employement: '',
        profileFor: '',
        city: '',
        gender: '',
        isSocial: '',
        isVideo: '',
      })
      fetchData()
    } catch (error) {
      console.log('Something Went Wrong', error)
    }
  }

  const handleSearch = () => {
    setIsBtnLoading(true)
    searchByName()
    setIsBtnLoading(false)
  }

  useEffect(() => {
    try {
      if (
        redirState?.age ||
        redirState?.emp ||
        redirState?.pfor ||
        redirState?.city ||
        redirState?.gender ||
        redirState?.isSocial
      ) {
        handleFilter()
      } else {
        fetchData()
      }
    } catch (error) {
      console.log('Something Went Wrong', error)
    }
  }, [])

  return (
    <div className='pageBody container'>
      <h1 className='pageHeading'>Search</h1>
      <div className='searchWrapper'>
        <div className='filterWrapper'>
          <select onChange={handleChange} value={gender} name='gender'>
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <select onChange={handleChange} value={age} name='age'>
            <option value=''>Select Age Group</option>
            <option value='21-30'>21-30</option>
            <option value='30-40'>30-40</option>
            <option value='40-50'>40-50</option>
          </select>
          <input
            onChange={handleChange}
            placeholder='Type City Name'
            value={city}
            name='city'
          />

          <select onChange={handleChange} value={profileFor} name='profileFor'>
            <option value=''>Select Profile</option>
            <option value='myself'>Self</option>
            <option value='other'>Others</option>
          </select>
          <select
            onChange={handleChange}
            value={employement}
            name='employement'
          >
            <option value=''>Employement Type</option>
            <option value='govt'>Govt Employee</option>
            <option value='selfemployeed'>Self Employed</option>
            <option value='privatejobs'>Private Jobs</option>
          </select>
          <select onChange={handleChange} value={isSocial} name='isSocial'>
            <option value=''>With Social Links</option>
            <option value='yes'>Yes</option>
          </select>
          <select onChange={handleChange} value={isVideo} name='isVideo'>
            <option value=''>With Video Links</option>
            <option value='yes'>Yes</option>
          </select>
          <div className='filterBtns'>
            <button
              onClick={handleFilter}
              disabled={isBtnLoading}
              className='btnSearch'
            >
              {isBtnLoading ? 'Loading' : 'Filter'}
            </button>
            <button onClick={handleReset} className='btnReset'>
              Reset
            </button>
          </div>
        </div>
        <div className='searchDiv'>
          <input
            type='text'
            value={searchName}
            placeholder='Search By Name'
            onChange={handleSearchString}
          />
          <button
            onClick={handleSearch}
            disabled={isBtnLoading}
            className='btnSearch'
          >
            {isBtnLoading ? 'Loading' : 'Search'}
          </button>
        </div>
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <SearchCardList
            fetchData={fetchData}
            data={!isSearched ? data : filterData}
          />
        )}
      </div>
    </div>
  )
}

export default Search
