import { Link } from 'react-router-dom'
import { FaCheck, FaTimes, FaAward, FaArrowRight } from 'react-icons/fa'
import './planSection.style.css'
import bg from '../../assets/pricebg.png'
const PlanSection = () => {
  return (
    <section
      className='planSection'
      style={{
        backgroundImage: `linear-gradient(to bottom right,#43175774,#0000bb5c),url(${bg})`,
      }}
    >
      <h3 className='sectionHeading'>Plans</h3>
      <div className='planCardWrapper'>
        <div className='planSectionCard'>
          <h3>Basic</h3>
          <ul>
            <li className='include'>
              <FaCheck /> User Profile Making
            </li>
            <li>
              <FaTimes /> View Profile
            </li>
            <li>
              <FaTimes />
              Send Connection
            </li>
            <li>
              <FaTimes />
              Match Making
            </li>
            <li>
              <FaTimes />
              Background Check
            </li>
          </ul>
          <p className='planPrice'>₹ 0</p>
          <Link to='/plans'>
            <button>Select Plan</button>
          </Link>
        </div>
        <div className='planSectionCard big'>
          <div className='popular'>
            <FaAward />
            Popular
          </div>
          <h3>Gold</h3>
          <ul className='frontUl'>
            <li className='include'>
              <FaCheck /> User Profile Making
            </li>
            <li className='include'>
              <FaCheck />
              View Profile
            </li>
            <li className='include'>
              <FaCheck />
              Send Connection
            </li>
            <li>
              <FaTimes />
              Match Making
            </li>
            <li>
              <FaTimes />
              Background Check
            </li>
          </ul>
          <p className='planPrice'>₹ 3100</p>
          <Link to='/plans'>
            <button>Select Plan</button>
          </Link>
        </div>
        <div className='planSectionCard'>
          <h3>Platinum</h3>
          <ul className='frontUl'>
            <li className='include'>
              <FaCheck />
              User Profile Making
            </li>
            <li className='include'>
              <FaCheck />
              View Profile
            </li>
            <li className='include'>
              <FaCheck />
              Send Connection
            </li>
            <li className='include'>
              <FaCheck />
              Match Making
            </li>
            <li>
              <FaTimes />
              Background Check
            </li>
          </ul>
          <p className='planPrice'>₹ 11000</p>
          <Link to='/plans'>
            <button>Select Plan</button>
          </Link>
        </div>
      </div>
      <Link className='planReferBtn' to='/plans'>
        See Full Plan List <FaArrowRight className='arrowSvg' />
      </Link>
    </section>
  )
}

export default PlanSection
