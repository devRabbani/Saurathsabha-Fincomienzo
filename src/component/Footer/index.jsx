import React from 'react'
import './footer.style.css'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerMainWrapper'>
        <div className='container footerFlex'>
          <div className='footerColumn'>
            <h2>About</h2>
            <p>
              FinComienzo is a fast growing and leading consulting organization,
              that provides profound expertise, objective insights, a tailored
              approach and unparalleled collaboration to help businesses and
              leaders confidently face the ever-dynamic future.
            </p>
          </div>
          <div className='footerColumn'>
            <h2>Links</h2>
            <ul>
              <li>
                <a href=''>About Us</a>
              </li>
              <li>
                <a href=''>Blogs</a>
              </li>
              <li>
                <a href=''>Why we stand out</a>
              </li>
              <li>
                <a href=''>Services</a>
              </li>
              <li>
                <a href=''>Packages</a>
              </li>
              <li>
                <a href=''>Testimonials</a>
              </li>
            </ul>
          </div>
          <div className='footerColumn'>
            <h2>Other Links</h2>
            <ul>
              <li>
                <a href=''>Press & Media</a>
              </li>
              <li>
                <a href=''>Gallery</a>
              </li>
              <li>
                <a href=''>Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className='footerColumn'>
            <h2>Address</h2>
            <p>
              1025, Sainath Apartment Compex, DDA Flats, Sector-28, Rohini,
              Delhi-110082
              <span>+91 8527853048</span>
            </p>
            <h2 className='h2Margin'>Social Links</h2>
            <div className='socialLinkWrapper'>
              <a href='#' target='_blank' rel='noopener noreferrer'>
                <FaInstagram />
              </a>
              <a href='#' target='_blank' rel='noopener noreferrer'>
                <FaFacebook />
              </a>
              <a href='#' target='_blank' rel='noopener noreferrer'>
                <FaTwitter />
              </a>
              <a href='#' target='_blank' rel='noopener noreferrer'>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
