import { useContext, useState } from 'react'
import UserContext from '../../context/user'
import { storage } from '../../lib/firebase'
import { addAdditionalFile } from '../../utils/firebase'

const UploadProfileFile = ({ setIsManual, uid }) => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const uploadTask = storage
      .ref(`additionalFiles/${uid}/${file.name}`)
      .put(file)
    uploadTask.on(
      'state_changed',
      () => {},
      (err) => {
        setIsLoading(false)
        alert('Something Went Wrong, Please Try Again')
        console.log(err)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          await addAdditionalFile(uid, downloadURL)
          setIsLoading(false)
          setIsManual(true)
        })
      }
    )
  }

  return (
    <>
      <p className='uploadProfileP'>
        {isLoading
          ? `Hang On File is Uploading Please Wait!`
          : 'If you dont want to fill the form , just write your details on paper or on any document and upload the file here'}
      </p>
      <form onSubmit={handleSubmit} className='profileFileDiv'>
        <input
          type='file'
          required
          name='profile'
          placeholder='Choose your file'
          onChange={handleChange}
        />
        <button disabled={isLoading} type='submit'>
          {isLoading ? 'Loading..' : 'Submit'}
        </button>
      </form>
      <p className='or'>Or</p>
    </>
  )
}

export default UploadProfileFile
