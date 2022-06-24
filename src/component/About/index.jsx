import React from 'react'
import aboutImg from '../../assets/about.webp'
import rangoliImg from '../../assets/rangoli.png'
import bgpattern from '../../assets/aboutbg.png'
import './about.style.css'

const About = () => {
  return (
    <section
      className='about'
      style={{
        backgroundImage: `linear-gradient(to right,#0000005f,#00000059),url(${bgpattern})`,
      }}
    >
      <div className='container aboutContainer'>
        <img src={rangoliImg} alt='rangoli' className='rangoliBg' />
        <div className='leftAbout'>
          <h3 className='divHeader'>About</h3>
          <h2 className='aboutHeader'>
            We are one of you, We know the culture
          </h2>
          <p className='aboutPara'>
            Saurath Sabha is a historical village situated approximately 6km
            northeast of Madhubani in the Madhubani District of Bihar,India. It
            is famous for its annual gathering of thousands of maithil Brahman
            to match couples during the Hindu months of Jyestha-Aasadh. The
            gathering is organised in an orchard covering 22 acres (bighas) of
            land, which are said to have been donated by the Maharaja of
            Darbhanga. It is an important social event in India that is focused
            on arranged marriages between Maithil men and women according to a
            reading of their lineage history by the registrars (Panjikars).
          </p>
        </div>
        <div className='rightAbout'>
          <img className='aboutImg' src={aboutImg} alt='about' />
        </div>
      </div>
    </section>
  )
}

export default About
