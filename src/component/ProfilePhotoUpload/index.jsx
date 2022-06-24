import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/user'
import { storage } from '../../lib/firebase'
import {
  addAdditionalData,
  getProfilePic,
  updateProfilePic,
  uploadProfile,
} from '../../utils/firebase'

const ProfilePhotoUpload = ({ data, uid }) => {
  const [photoUrl, setPhotoUrl] = useState('male.png')
  const [photo, setPhoto] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isImgLoading, setIsImgLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const uploadRef = useRef()
  const history = useHistory()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    uploadRef.current.click()
  }

  const handleUpload = () => {
    if (!photo) {
      handleOnSkip()
      return
    } else {
      setError('')
      setIsLoading(true)
      const uploadTask = storage.ref(`profile/${uid}/${photo.name}`).put(photo)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
          console.log('Upload is ' + progress + '% done')
        },
        (err) => {
          setIsLoading(false)
          setError('Something went wrong , Try Again !')
          console.error(err)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            await updateProfilePic(uid, downloadURL)
            await addAdditionalData(uid, data)
            setIsLoading(false)
            history.push('profile/' + uid)
          })
        }
      )
    }
  }

  const handleOnSkip = async () => {
    setError('')
    setIsLoading(true)
    try {
      await addAdditionalData(uid, data)
      setIsLoading(false)
      history.push('profile/' + uid)
    } catch (error) {
      setIsLoading(false)
      setError('Something went wrong , Try Again !')
      console.error(error)
    }
  }

  //Side effect
  useEffect(() => {
    if (!photo) {
      return
    }
    setIsImgLoading(true)
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPhotoUrl(fileReader.result)
      setIsImgLoading(false)
    }
    fileReader.readAsDataURL(photo)
  }, [photo])

  // Checking if user is editing
  useEffect(() => {
    const fetchProfilePic = async () => {
      setIsImgLoading(true)
      const result = await getProfilePic(uid)
      if (result.length > 0) {
        setPhotoUrl(result)
      }
      setIsImgLoading(false)
    }
    fetchProfilePic()
  }, [])

  return (
    <div className='photoUploadWrapper'>
      <img src={photoUrl} alt='avatar' className='avatar' />

      {/* <button onClick={handleUpload}>Upload</button> */}
      {isLoading ? (
        <p className='loading'>
          {progress > 0 && progress + '%'} Please wait while loading...
        </p>
      ) : (
        <>
          <input
            type='file'
            name='image'
            ref={uploadRef}
            onChange={handleChange}
            accept='image/*'
            placeholder='Choose a profile pic'
            hidden='hidden'
          />
          <button className='changeImg' onClick={handleClick}>
            {isImgLoading ? 'Loading...' : 'Choose Picture'}
          </button>

          {/* <input
            type='file'
            onChange={handleChange}
            className='profilePicUpload'
            placeholder='Select Your Photo'
            accept='image/*'
          /> */}

          <div className='btnDiv'>
            <button
              disabled={isLoading}
              onClick={handleOnSkip}
              className='btn skip'
            >
              Skip
            </button>
            <button
              disabled={isLoading}
              onClick={handleUpload}
              className='btn finish'
            >
              Finish
            </button>
          </div>
        </>
      )}
      {error && <p className='errorAdditional'>{error}</p>}
    </div>
  )
}

export default ProfilePhotoUpload
