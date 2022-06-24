import React from 'react'
import './services.style.css'
import Button from '../Button'
import serviceImg from '../../assets/services.webp'
import bg from '../../assets/aboutpattern.png'
import { Link } from 'react-router-dom'
const Services = () => {
  return (
    <section
      className='service'
      style={{
        backgroundImage: `linear-gradient(to right,#431757ad,#ff6347c7),url(${bg})`,
      }}
    >
      <div className='container serviceContainer'>
        <div className='leftService'>
          <img className='aboutImg' src={serviceImg} alt='about' />
        </div>
        <div className='rightService'>
          <h3 className='divHeader'>Services</h3>
          {/* <h2 className='serviceHeader'>Something goes here second header</h2> */}
          <p className='servicePara'>
            Service providers who provides services like catering, marriage
            pandals, lighting, flower work, Taxies, Cloth & Gold merchants or
            any one who are connected directly or indirectly related to a
            marriage ceremony can associate with us to get the work on
            commission basis. Service provide can also advertise on this website
            as the thousands of parents of both brides and grooms are visits our
            websites everyday and they need reliable and cost efficient service
            providers for marriage and other related ceremonies
          </p>
          <Link className='btn btnRing' to='/service/register'>
            Register Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
