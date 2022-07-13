import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/user'
import { showRZPYShidhant } from '../../utils/razorpay'
import './shidhantSignup.style.css'

export default function ShidhantSignup() {
  const { user } = useContext(UserContext)
  const history = useHistory()
  const [data, setData] = useState({
    name: '',
    dob: '',
    father: '',
    grandfather: '',
    maul: '',
    gautra: '',
    number: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSucces, setIsSucces] = useState(false)

  const { name, dob, father, grandfather, maul, gautra, number } = data

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await showRZPYShidhant(data, setIsSucces)
    } catch (error) {
      console.log('Something went wrong')
    }

    setIsLoading(false)
  }

  return (
    <div className='serviceRegister'>
      <div className='container'>
        {isSucces ? (
          <div className='succesShidhant'>
            <p>
              Thanks for using this service.Wait for our backend team to
              confirm.We will get back to you shortly
            </p>
            <button onClick={() => history.push('/')}>Go back to home</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Online Shidhant Service</h2>
            <input
              type='text'
              onChange={handleChange}
              value={name}
              name='name'
              required
              placeholder='Enter Your Full Name'
            />
            <input
              type='text'
              onChange={handleChange}
              value={father}
              name='father'
              required
              placeholder='Enter Your Father Name'
            />
            <input
              type='text'
              onChange={handleChange}
              value={grandfather}
              name='grandfather'
              required
              placeholder='Enter Your Grandfather Name'
            />
            <input
              type='date'
              name='dob'
              value={dob}
              required
              onChange={handleChange}
            />
            <div className='maulGautra'>
              <input
                type='text'
                onChange={handleChange}
                value={maul}
                name='maul'
                required
                placeholder='Your Maul'
              />
              <input
                type='text'
                onChange={handleChange}
                value={gautra}
                name='gautra'
                required
                placeholder='Your Gautra'
              />
            </div>
            <input
              type='text'
              onChange={handleChange}
              value={number}
              name='number'
              required
              maxLength={10}
              placeholder='Enter Your Phone Number'
            />

            <button type='submit'>{isLoading ? 'Loading..' : 'Submit'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
