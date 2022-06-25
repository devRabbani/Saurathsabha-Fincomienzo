import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from '../../context/user'
import { getDataByUid } from '../../utils/firebase'
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa'
import './profile.style.css'
import Loader from '../../component/Loader'
import useTop from '../../hooks/useTop'
import useTitle from '../../hooks/useTitle'
import roles from '../../utils/roles'

const Profile = () => {
  useTop()
  useTitle('Profile | SaurathSabha')

  const [additionalData, setAdditionalData] = useState()
  const [profileData, setProfileData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [menuPage, setMenuPage] = useState(0)

  const menuTitles = ['Education and Carrer', 'Family Background', 'About Me']

  const uid = useParams().uid

  const { user, plan } = useContext(UserContext)
  const isPhoto = roles[plan?.plan]?.photo
  const isAdditional = roles[plan?.plan]?.additional
  const isSLinks = roles[plan?.plan]?.social
  const isVLinks = roles[plan?.plan]?.video

  // const profileData = useUser(uid)
  const isOwn = uid === user?.uid

  const fetchData = async () => {
    setIsLoading(true)
    const userdata = await getDataByUid(uid, 'users')
    setProfileData(userdata)
    const additional = await getDataByUid(uid, 'additional')
    setAdditionalData(additional)
    setIsLoading(false)
  }

  const renderInfoPage = () => {
    if (menuPage === 0) {
      return (
        <p>
          <strong>Qualification : </strong> {additionalData.highestQual}
          <br />
          <strong>Completion Year : </strong> {additionalData.yearComplete}
          <br />
          <strong>Current Job : </strong> {additionalData.currentJob}
          <br />
          <strong>Estimated Annual Income : </strong> {additionalData.income}
          /-
        </p>
      )
    } else if (menuPage === 1) {
      return (
        <p>
          <strong>Father Name : </strong> {additionalData.fatherName}
          <br />
          <strong>Father Profession : </strong>{' '}
          {additionalData.fatherProfession}
          <br />
          <strong>Grandfather Name : </strong> {additionalData.grandFather}
          <br />
          <strong>Gautra : </strong> {additionalData.gautra}
          <br />
          <strong>Maul : </strong> {additionalData.maul}
          <br />
          <strong>Employement : </strong> {profileData.employement}
          <br />
          <strong>Gender : </strong> {profileData.gender}
          <br />
          {additionalData.siblings.length > 0 && (
            <>
              <strong>Sibblings : </strong>
              <br />
              {additionalData.siblings.map((item, i) => (
                <span key={i}>
                  <span className='sibbNo'>sibling {i + 1} : </span>
                  <span className='sibbAge'>
                    {item.age} {item.relation}
                  </span>{' '}
                  ---&nbsp;
                  {item.status}
                  <br />
                </span>
              ))}
            </>
          )}
        </p>
      )
    } else {
      return (
        <>
          <p className='myBio'>{additionalData.bio}</p>
          <h2 className='aboutBioH2'>Hobies and Others :</h2>
          <p>
            <strong>Hobbies : </strong>
            {additionalData.hobbies}
            <br />
            <strong>Do you smoke ? : </strong>{' '}
            {additionalData.isSmoker?.toUpperCase()}
            <br />
            <strong>Are you alcoholic ? : </strong>{' '}
            {additionalData.isAlcoholic?.toUpperCase()}
            <br />
          </p>

          {(additionalData.videolink !== '' ||
            additionalData.facebook !== '' ||
            additionalData.instagram !== '' ||
            additionalData.linkedin !== '' ||
            additionalData.twitter !== '' ||
            additionalData.email) && (
            <h2 className='aboutBioH2'>Social Links :</h2>
          )}
          {isVLinks ? (
            additionalData.videolink && (
              <p>
                <strong>Video Profile Link : </strong>{' '}
                <a
                  href={additionalData.videolink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Go To Video Link
                </a>
              </p>
            )
          ) : (
            <p>
              <strong>Video Profile Link : </strong>{' '}
              <span className='hideBlur'>Upgrade Your plan</span>
            </p>
          )}
          {isSLinks ? (
            <div className='socialIconsWrapper'>
              {additionalData.facebook && (
                <a
                  href={additionalData.facebook}
                  className='fb'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaFacebook />
                </a>
              )}
              {additionalData.twitter && (
                <a
                  href={additionalData.twitter}
                  className='twitter'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaTwitter />
                </a>
              )}
              {additionalData.instagram && (
                <a
                  href={additionalData.instagram}
                  className='insta'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram />
                </a>
              )}
              {additionalData.linkedin && (
                <a
                  href={additionalData.linkedin}
                  className='linkedin'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedin />
                </a>
              )}
              {additionalData.email && (
                <a
                  href={additionalData.email}
                  target='_blank'
                  className='email'
                  rel='noopener noreferrer'
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          ) : (
            <div className='socialIconsWrapper'>
              <span className='hideBlurS'>
                Upgrade your plan to see social links
              </span>
            </div>
          )}
        </>
      )
    }
  }

  useEffect(() => {
    fetchData()
  }, [uid])

  return (
    <div className='profile'>
      <div className='pageBody container'>
        <h1 className='pageHeading'>{isOwn ? 'My Profile' : 'Profile'}</h1>
        {/* <Loader /> */}
        {profileData && !isLoading ? (
          <div className='mainProfileCard'>
            <div className='profileWrapper'>
              {isOwn && (
                <div className={`planBadge ${plan?.plan}`}>{plan?.plan}</div>
              )}
              <img
                src={isOwn || isPhoto ? profileData.profileUrl : '/noimage.png'}
                alt='Profile img'
              />
              <div className='rightSide'>
                <p>
                  <strong>NAME : </strong> {profileData.name}
                  <br />
                  <strong>Age : </strong> {profileData.age}
                  <br />
                  <strong>Profile For : </strong> {profileData.profileFor}
                  <br />
                  <strong>City : </strong> {profileData.city}
                  <br />
                  <strong>Email : </strong>{' '}
                  {isSLinks || isOwn ? (
                    profileData.email
                  ) : (
                    <span className='hideBlurEmail'>Upgrade plan</span>
                  )}
                  <br />
                  <strong>Employement : </strong> {profileData.employement}
                  <br />
                  <strong>Gender : </strong> {profileData.gender}
                  <br />
                </p>
              </div>
            </div>
            <div className='additionalInfo'>
              {/* <h1 className='pageHeading'>Additional Info</h1> */}
              {!isAdditional && !isOwn ? (
                <div className='noData'>
                  <p>Upgrade your plan to view Additional informations.</p>
                  <Link to='/plans'>View Plans</Link>
                </div>
              ) : !additionalData ? (
                isOwn ? (
                  <div className='noData'>
                    <p>
                      Please make your full profile, Additional Information Not
                      Found!
                    </p>
                    <Link to='/additional'>Create Full Profile</Link>
                  </div>
                ) : (
                  <div className='noData'>
                    <p>
                      This User has not created full account, No Additional
                      Information Found!
                    </p>
                  </div>
                )
              ) : (
                <>
                  <div className='linksDiv'>
                    {menuTitles.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => setMenuPage(i)}
                        className={`menu ${menuPage === i && 'active'}`}
                      >
                        {item}
                      </div>
                    ))}
                    {isOwn && (
                      <Link className='menu' to='/additional'>
                        Edit Profile
                      </Link>
                    )}
                  </div>
                  <div className='linkDetails'>
                    <h2>{menuTitles[menuPage]}</h2>
                    {renderInfoPage()}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Profile
