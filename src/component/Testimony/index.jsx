import React from 'react'
import bg from '../../assets/bg-abstract.svg'
import data from '../Featured/data'
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'

import './testimony.style.css'
SwiperCore.use([EffectCoverflow, Pagination])

const Testimony = () => {
  return (
    <section style={{ backgroundImage: `url(${bg})` }} className='testimony'>
      <div className='container testimonyContainer'>
        <h3 className='sectionHeading'>Testimony</h3>
        <p className='testimonyHeader'>What do people feel about us??</p>
        <div className='testimonySlider'>
          <Swiper
            effect={'coverflow'}
            grabCursor
            centeredSlides
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            loop
            // className='mySwiper'
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <div className='testimonyCard'>
                  <img src='assets/quote.png' className='quote' alt='quote' />
                  <div className='content'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda deserunt labore sunt nulla architecto dolor,
                      cumque exercitationem quas quia saepe earum doloremque
                      dolores odit quis sapiente distinctio nesciunt error
                      minus.
                    </p>
                    <div className='memberDetails'>
                      <div className='memberImg'>
                        <img src={item.url} alt='member' />
                      </div>
                      <h3 className='memberName'>
                        Rishab Kumar
                        <br />
                        <span>Software Engineer</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Testimony
