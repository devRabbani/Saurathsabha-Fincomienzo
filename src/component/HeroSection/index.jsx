import React, { useState } from 'react'
import './heroSection.style.css'
import bg from '../../assets/herobg.webp'
import bgwave from '../../assets/wave-bottom.svg'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    pfor: '',
    age: '',
    gender: '',
    city: '',
    emp: '',
    isSocial: '',
  })
  const { isSocial, pfor, age, gender, city, emp } = searchData
  const handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className='heroSectionWrapper'>
      <div
        className='bgHero'
        style={{
          backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),url(${bg})`,
        }}
      />
      <div className='heroSection container'>
        {/* <div className='leftSide'>
          <img src={heroimage} alt='heroImage' />
        </div> */}
        <div className='rightSide'>
          <p className='headerTag'>
            We find the best match for your future mate
          </p>
          <h3 className='formHeader'>
            Find Your <span>Soulmate</span>
          </h3>
          <form className='formCard'>
            <div className='twoCol nameAgeForm'>
              <div className='form-group'>
                <label className='text-muted'>Age</label>
                <select name='age' value={age} onChange={handleChange}>
                  <option value=''>Any</option>
                  <option value='21-30'>21-30</option>
                  <option value='30-40'>30-40</option>
                  <option value='40-50'>40-50</option>
                </select>
              </div>

              <div className='form-group'>
                <label className='text-muted'>City</label>
                <input
                  onChange={handleChange}
                  type='text'
                  name='city'
                  placeholder='Enter city'
                  value={city}
                  className='form-control'
                />
              </div>
            </div>
            <div className='twoCol'>
              <div className='form-group'>
                <label className='text-muted'>ProfileFor</label>
                <select onChange={handleChange} name='pfor' value={pfor}>
                  <option value=''>All</option>
                  <option value='own'>Own</option>
                  <option value='other'>Family</option>
                </select>
              </div>

              <div className='form-group'>
                <label className='text-muted'>Employement</label>
                <select onChange={handleChange} name='emp' value={emp}>
                  <option value='all'>All</option>
                  <option value='selfemployed'>Self Employed</option>
                  <option value='govt'>Govt Jobs</option>
                  <option value='private'>Private Jobs</option>
                </select>
              </div>
            </div>
            <div className='twoCol'>
              <div className='form-group'>
                <label className='text-muted'>Social</label>
                <select
                  onChange={handleChange}
                  value={isSocial}
                  name='isSocial'
                >
                  <option value=''>With Social Links</option>
                  <option value='yes'>Yes</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='text-muted'>Gender</label>
                <select onChange={handleChange} name='gender' value={gender}>
                  <option value='all'>All</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
            <Link
              to={{ pathname: '/search', state: searchData }}
              className='btn btnGetstarted'
            >
              Search
            </Link>
          </form>
        </div>
        <div
          style={{ backgroundImage: `url(${bgwave})` }}
          className='bgWave'
        ></div>
      </div>
    </section>
  )
}

export default HeroSection
