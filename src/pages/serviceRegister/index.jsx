import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createServiceProvider, isServiceExist } from '../../utils/firebase'
import './serivice.style.css'

const ServiceRegister = () => {
  const [page, setPage] = useState(0)
  const [serviceData, setServiceData] = useState({
    name: '',
    number: '',
    bussinesType: '',
    bussinesAddress: '',
    serviceLoc: '',
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { name, number, bussinesType, bussinesAddress, serviceLoc } =
    serviceData

  const handleCheck = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const isExist = await isServiceExist(number)
      if (!isExist) {
        setIsLoading(false)
        setPage(1)
      } else {
        setIsLoading(false)
        setMessage('Service provider already exist in this number')
      }
    } catch (error) {
      setIsLoading(false)
      setMessage('Something went wrong ,Please try again !')
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      setIsLoading(false)
      await createServiceProvider(serviceData)
      setPage(2)
    } catch (error) {
      setIsLoading(false)
      setMessage('Something went wrong ,Please try again !')
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setMessage('')
    e.preventDefault()
    const { name, value } = e.target
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='serviceRegister'>
      {console.log('Run ')}
      <div className='container'>
        {page === 0 && (
          <form onSubmit={handleCheck}>
            {message && <p className='message'>{message}</p>}
            <h2>Service Register</h2>

            <input
              type='text'
              onChange={handleChange}
              value={name}
              name='name'
              required
              placeholder='Enter Your Name'
            />
            <input
              type='text'
              onChange={handleChange}
              value={number}
              name='number'
              required
              minLength={10}
              maxLength={10}
              placeholder='Enter Your Phone Number'
            />
            <button type='submit'>{isLoading ? 'Loading..' : 'Next'}</button>
          </form>
        )}
        {page === 1 && (
          <form onSubmit={handleSubmit}>
            <h2>Bussines details</h2>
            {message && <p className='message'>{message}</p>}
            <input
              type='text'
              required
              onChange={handleChange}
              value={bussinesType}
              name='bussinesType'
              placeholder='Enter Your Business Type'
            />
            <textarea
              rows={2}
              required
              onChange={handleChange}
              value={bussinesAddress}
              name='bussinesAddress'
              placeholder='Enter your address'
            />
            <textarea
              rows={4}
              required
              onChange={handleChange}
              value={serviceLoc}
              name='serviceLoc'
              placeholder='Service Location Eg-Pune, Mumbai etc'
            />
            <button className='right' type='submit'>
              {isLoading ? 'Loading..' : 'Finish'}
            </button>
          </form>
        )}

        {page === 2 && (
          <div className='successService'>
            <p>
              Successfully registered as a service provider, Please wait while
              our backend team verfiy your account.
            </p>
            <Link to='/'>Back To Home</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceRegister
