import React, { useState } from 'react'
import './signup.style.css'

import { registerUser } from '../../utils/firebase'
import useTop from '../../hooks/useTop'
import useTitle from '../../hooks/useTitle'

const Signup = ({ location, history }) => {
  useTop()
  useTitle('Signup | SaurathSabha')

  const { phoneNo, uid } = location.state

  // For Testing
  const [data, setData] = useState({
    name: '',
    email: '',
    city: '',
    age: '',
    employement: '',
    profileFor: '',
    gender: '',
    userId: uid,
    number: phoneNo,
  })
  const { name, email, city, age, employement, profileFor, gender } = data

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isInvalid = email === ''

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSignup = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    // Register User
    registerUser(data)
      .then(() => {
        setIsLoading(false)
        history.push(`/additional`)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
        setData({
          name: '',
          email: '',
          city: '',
          age: '',
          employement: '',
          profileFor: '',
          gender: '',
          userId: uid,
          number: phoneNo,
        })
        setError(error.message)
      })
  }

  return (
    <div className='signUpBg'>
      <div className='signUp container'>
        <h1 className='loginH1'>SignUp</h1>
        <div className='signUpCard'>
          <form onSubmit={handleSignup}>
            <p className='formIntro'>Setup Your Account</p>
            <div className='form-group'>
              <input
                type='text'
                name='name'
                placeholder='Enter Your Name'
                required
                maxLength={25}
                className='form-control'
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className='formHorizontal'>
              <div className='form-group'>
                <select
                  value={employement}
                  onChange={handleChange}
                  name='employement'
                  required
                >
                  <option label='Employment Type' value=''></option>
                  <option value='selfemployed'>Self Employed</option>
                  <option value='govt'>Govt Jobs</option>
                  <option value='private'>Private Jobs</option>
                </select>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='city'
                  placeholder='Enter City'
                  required
                  className='form-control'
                  value={city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='formHorizontal triple'>
              <div className='form-group'>
                <select
                  value={profileFor}
                  onChange={handleChange}
                  name='profileFor'
                  required
                >
                  <option label='Profile For' value=''></option>
                  <option value='myself'>My Self</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              <div className='form-group'>
                <select
                  value={gender}
                  onChange={handleChange}
                  name='gender'
                  required
                >
                  <option label='Gender' value=''></option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  name='age'
                  placeholder='Enter age'
                  required
                  className='form-control'
                  value={age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <input
                type='email'
                name='email'
                placeholder='Enter Email'
                required
                className='form-control'
                value={email}
                onChange={handleChange}
              />
            </div>
            <button
              className={`signInBtn ${isInvalid && 'disabled'}`}
              disabled={isInvalid}
              type='submit'
            >
              {isLoading ? 'Loading..' : 'Sign Up'}
            </button>
            {error && <p className='errorMsg'>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
