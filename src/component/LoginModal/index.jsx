import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../../context/firebase'
import firebase from 'firebase/compat/app'
import { isUserExist } from '../../utils/firebase.js'
import UserContext from '../../context/user'
import './loginModal.style.css'
import ModalContext from '../../context/modal'

const LoginModal = () => {
  const history = useHistory()

  const { firebaseApp } = useContext(FirebaseContext)

  const [number, setNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [show, setshow] = useState(false)
  const [final, setfinal] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(UserContext)
  const { setIsModal } = useContext(ModalContext)

  const isInvalid = number.length < 10

  const signin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const duplicate = await isUserExist(number)
    if (number === '' || number.length < 10 || !Number(number)) {
      setSuccess('')
      setError('Not a valid Number,Try again')
      setIsLoading(false)
      return
    }
    let verify = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
    })

    if (duplicate) {
      console.log('Not New User')

      firebaseApp
        .auth()
        .signInWithPhoneNumber('+91' + number, verify)
        .then((result) => {
          setSuccess(`OTP sent to +91-XXXXXXXX${number.slice(-2)}`)
          setfinal(result)
          setIsLoading(false)
          setshow(true)
        })
        .catch((err) => {
          console.error(err)
          setSuccess('')
          setError('Something went wrong, Try Again!')
          setIsLoading(false)
          window.location.reload()
        })
    } else {
      setSuccess('New user registration process')
      setIsNew(true)
      firebaseApp
        .auth()
        .signInWithPhoneNumber('+91' + number, verify)
        .then((result) => {
          setSuccess(`OTP sent to +91-XXXXXXXX${number.slice(-2)}`)
          setfinal(result)
          setIsLoading(false)
          setshow(true)
        })
        .catch((err) => {
          console.error(err)
          setSuccess('')
          setError('Something went wrong with your number')
          setIsLoading(false)
          window.location.reload()
        })
      console.log('New user')
    }
  }

  const validateOtp = (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (otp === null || final === null) {
      setIsLoading(false)
      return
    }
    final
      .confirm(otp)
      .then((result) => {
        //SUcces
        setIsLoading(false)
        if (isNew) {
          setIsModal(false)
          history.push({
            pathname: '/signup',
            state: {
              phoneNo: number,
              uid: result.user.uid,
            },
          })
        } else {
          setIsLoading(false)
          setIsModal(false)
          console.log('Success from user signin')

          history.push('/')
        }
      })
      .catch((err) => {
        setSuccess('')
        setError('OTP Validation Failed, Try Again!')
        console.error(err)
        setIsLoading(false)
      })
  }

  const handleOtp = (e) => {
    setError('')
    setOtp(e.target.value)
  }
  const handleNumber = (e) => {
    setError('')
    setNumber(e.target.value)
  }

  return (
    <div className='authCard'>
      <h1 className='loginH1'>Signup or Login</h1>
      <hr />

      {show ? (
        <>
          <div className='form-group'>
            <label className='text-muted'>Enter OTP</label>
            <input
              type='text'
              name='otp'
              maxLength={6}
              minLength={6}
              placeholder='Enter OTP'
              className='form-control'
              value={otp}
              onChange={handleOtp}
            />
          </div>
          <button className='signInBtn' onClick={validateOtp}>
            {isLoading
              ? 'Loading..'
              : isNew
              ? 'Create New Account'
              : 'Continue'}
          </button>
        </>
      ) : (
        <>
          <div className='form-group'>
            <label className='text-muted'>Enter Phone No</label>
            <input
              type='text'
              maxLength='10'
              minLength='10'
              name='phone'
              placeholder='Enter Phone Number'
              required
              className='form-control'
              value={number}
              onChange={handleNumber}
            />
          </div>
          <button
            className={`signInBtn ${isInvalid && 'disabled'}`}
            disabled={isInvalid}
            onClick={signin}
          >
            {isLoading ? 'Loading..' : 'Send OTP'}
          </button>
        </>
      )}
      {error && <p className='errorMsg'>{error}</p>}
      {success && <p className='successMsg'>{success}</p>}
      <div id='recaptcha'></div>
    </div>
  )
}

export default LoginModal
