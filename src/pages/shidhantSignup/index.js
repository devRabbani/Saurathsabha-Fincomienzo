import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/user'
import { storage } from '../../lib/firebase'
import { showRZPYShidhant } from '../../utils/razorpay'
import './shidhantSignup.style.css'
import toast from 'react-hot-toast'

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
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
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

  const handleFileUpload = async () => {
    const snapshot1 = await storage
      .ref(`horoscopes/${Date.now()}/${file1?.name}`)
      .put(file1)

    const snapshot2 = await storage
      .ref(`horoscopes/${Date.now()}/${file2?.name}`)
      .put(file2)
    const url1 = await snapshot1.ref.getDownloadURL()
    const url2 = await snapshot2.ref.getDownloadURL()
    return { url1, url2 }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const toastFile = toast.loading('Files Uploading')
      const { url1, url2 } = await handleFileUpload()
      console.log(url1?.length && url2?.length, url1, url2)
      if (url1?.length && url2?.length) {
        toast.success('File uploading complete, Please Wait', {
          id: toastFile,
        })
        await showRZPYShidhant(data, url1, url2, setIsSucces)
      } else {
        toast.error('Failed file uploading, Try Again', {
          id: toastFile,
        })
      }
    } catch (error) {
      toast.error('Something went wrong, Try Again!')
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
            <div className='maulGautra'>
              <input
                type='text'
                onChange={handleChange}
                value={number}
                name='number'
                required
                maxLength={10}
                placeholder='Phone Number'
              />
              <input
                type='date'
                name='dob'
                value={dob}
                placeholder='Date of Birth'
                required
                onChange={handleChange}
              />
            </div>
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
            <div className='fileGroup'>
              <label>Bride's Horoscope</label>
              <input
                type='file'
                name='bride'
                required
                onChange={(e) => setFile1(e.target.files[0])}
                placeholder="Bride's horoscope"
              />
            </div>
            <div className='fileGroup'>
              <label>Grooms's Horoscope</label>
              <input
                type='file'
                name='bride'
                required
                onChange={(e) => setFile2(e.target.files[0])}
                placeholder="Groom's horoscope"
              />
            </div>

            <button type='submit'>{isLoading ? 'Loading..' : 'Submit'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
