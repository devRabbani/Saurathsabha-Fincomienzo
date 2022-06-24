import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EducationInfo from '../../component/EducationInfo'
import ExpectationInfo from '../../component/ExpectationInfo'
import FamilyInfo from '../../component/FamilyInfo'
import MyselfInfo from '../../component/MyselfInfo'
import ProfilePhotoUpload from '../../component/ProfilePhotoUpload'
import SocialInfo from '../../component/SocialInfo'
import UploadProfileFile from '../../component/UploadProfileFile'
import UserContext from '../../context/user'
import useTop from '../../hooks/useTop'
import { getDataByUid } from '../../utils/firebase'
import './additional.style.css'

const headingdata = [
  'Information About Your Education and Career',
  'Some Information About Your Family',
  'Some More Question About Yourself',
  'Paste Your Social Links',
  'Question About Expectation From You',
]

const Additional = () => {
  useTop()
  // States
  const [additionalData, setAdditionalData] = useState({
    bio: '',
    highestQual: '',
    yearComplete: '',
    currentJob: '',
    income: '',
    department: '',
    fatherName: '',
    fatherProfession: '',
    siblings: [],
    grandFather: '',
    gautra: '',
    maul: '',
    hobbies: '',
    isSmoker: 'no',
    isAlcoholic: 'no',
    isDowryFree: 'no',
    isLikeGrand: 'no',
    isPartDowry: 'no',
    isSupportWidower: 'no',
    opinion: '',
    videolink: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    email: '',
  })

  const [page, setPage] = useState(0)
  const [photoUpld, setPhotoUpld] = useState(false)
  const [isManual, setIsManual] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(UserContext)
  const {
    bio,
    highestQual,
    yearComplete,
    currentJob,
    income,
    department,
    fatherName,
    fatherProfession,
    siblings,
    grandFather,
    gautra,
    maul,
    hobbies,
    isSmoker,
    isAlcoholic,
    isDowryFree,
    isLikeGrand,
    isPartDowry,
    isSupportWidower,
    opinion,
    instagram,
    facebook,
    twitter,
    linkedin,
    email,
    videolink,
  } = additionalData

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdditionalData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSetSibbs = (value) => {
    setAdditionalData((prev) => ({
      ...prev,
      siblings: value,
    }))
  }

  // Testing
  const handleSibb = (e) => {
    e.preventDefault()
    const details = {
      age: '',
      relation: '',
      status: '',
    }
    setAdditionalData((prev) => ({
      ...prev,
      siblings: [...prev.siblings, details],
    }))
  }
  const handleSibbsChange = (index, e) => {
    e.preventDefault()
    e.persist()

    setAdditionalData((prev) => ({
      ...prev,
      siblings: prev.siblings.map((item, i) => {
        if (i !== index) {
          return item
        }
        return {
          ...item,
          [e.target.name]: e.target.value,
        }
      }),
    }))
  }
  const handleRemove = (e, index) => {
    e.preventDefault()
    setAdditionalData((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((item) => item !== prev.siblings[index]),
    }))
  }

  // Side Effect
  useEffect(() => {
    // If Editing User
    const fetchEditingData = async () => {
      setIsLoading(true)
      const result = await getDataByUid(user?.uid, 'additional')
      if (result) {
        setAdditionalData(result)
        setIsEditing(true)
        console.log('User is editing')
      }
      setIsLoading(false)
    }
    fetchEditingData()
  }, [])

  return (
    <div className='additional'>
      {console.log('additional', additionalData.siblings)}
      <div className='container additionalWrapper'>
        {isManual ? (
          <div className='waitIsManual'>
            <p>
              You succesfull uploaded , please wait for our backend team to
              update your your profile
            </p>
            <Link to='/'>Got to Home</Link>
          </div>
        ) : (
          <>
            {page === 0 && !isEditing && (
              <UploadProfileFile uid={user?.uid} setIsManual={setIsManual} />
            )}
            <h1 className='additionalH1'>
              {photoUpld
                ? 'For Strong Account Upload Your Profile Picture'
                : headingdata[page]}
            </h1>
            {!photoUpld ? (
              isLoading ? (
                <p className='loadingEditing'>Loading Data...</p>
              ) : (
                <>
                  <div className='progress'>
                    <p>Step {page + 1} of 5</p>
                  </div>
                  <form>
                    {page === 0 && (
                      <EducationInfo
                        highestQual={highestQual}
                        yearComplete={yearComplete}
                        currentJob={currentJob}
                        income={income}
                        department={department}
                        handleChange={handleChange}
                        setPage={setPage}
                      />
                    )}
                    {page === 1 && (
                      <FamilyInfo
                        fatherName={fatherName}
                        fatherProfession={fatherProfession}
                        siblings={siblings}
                        grandFather={grandFather}
                        gautra={gautra}
                        maul={maul}
                        handleChange={handleChange}
                        handleSetSibbs={handleSetSibbs}
                        handleSibb={handleSibb}
                        handleSibbsChange={handleSibbsChange}
                        handleRemove={handleRemove}
                        setPage={setPage}
                      />
                    )}
                    {page === 2 && (
                      <MyselfInfo
                        handleChange={handleChange}
                        setPage={setPage}
                        bio={bio}
                        hobbies={hobbies}
                        isSmoker={isSmoker}
                        isAlcoholic={isAlcoholic}
                        videolink={videolink}
                      />
                    )}
                    {page === 3 && (
                      <SocialInfo
                        handleChange={handleChange}
                        setPage={setPage}
                        instagram={instagram}
                        twitter={twitter}
                        linkedin={linkedin}
                        facebook={facebook}
                        email={email}
                      />
                    )}
                    {page === 4 && (
                      <ExpectationInfo
                        isDowryFree={isDowryFree}
                        isLikeGrand={isLikeGrand}
                        isPartDowry={isPartDowry}
                        isSupportWidower={isSupportWidower}
                        opinion={opinion}
                        handleChange={handleChange}
                        setPage={setPage}
                        setPhotoUpld={setPhotoUpld}
                      />
                    )}
                  </form>
                </>
              )
            ) : (
              <ProfilePhotoUpload data={additionalData} uid={user?.uid} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Additional
