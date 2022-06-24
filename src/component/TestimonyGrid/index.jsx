import React from 'react'
import bg from '../../assets/bg-abstract.svg'
import male from '../../assets/male.png'
import './testimonyGrid.style.css'
const data = [
  {
    img: bg,
    name: 'Tanya Mishra & Rajat Mishra, Chicago, USA.',
    quoteTitle:
      'I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny’s worth.',
    quote:
      "I want to thank team SaurathSabha.in for helping me find my life partner cum my best friend. I 1st meet her on 15th of April and after talking to each other for 10 mins we found out that our vibes match. Our likes, dislikes, favorite destination, favorite foods matches as well, and we immediately decided that we will make a great couple and life partner. We think that we couldn't have found a better match.",
  },
  {
    img: bg,
    name: 'Chunmun & Heera Mishra, Madhubani, India',
    quoteTitle: 'The team was very supportive and kept me motivated',
    quote:
      'I met with her in this platform.I found my life partner for the same Swapone, Soione, Chintone,Monone etc. Thanks to Saurathsabha.in',
  },
  {
    img: bg,
    name: 'Sonali & Ajay Jha, Orissa, India',
    quoteTitle: 'An overall wonderful and rewarding experience',
    quote:
      'We matched, spoke for some time and then met in real. We were sure we want to spend our life together after initial few conversations.',
  },
  {
    img: bg,
    name: 'Pushpa & Ashok Jha, Chennai, India',
    quoteTitle:
      'Awesome teaching support from TAs who did the bootcamp themselves.Getting guidance from them and learning from their experiences was easy.',
    quote:
      'We connected through SaurathSabha.in, met each other, and exchanged our thoughts, there & then we realized that we are meant for each other, and this Jodi was made in heaven. Both the family met & got along very well too and we got married on 14th Nov 2021. It was Chet mangni & pat Biha... Big Thanks for SaurathSabha.in',
  },
  {
    img: bg,
    name: 'Mahua & Ganpati Jha , Germany',
    quoteTitle: 'Such a life-changing experience. Highly recommended!',
    quote:
      'I got a message from Ganpati, after which we talked on call, in the very first conversation, we clicked. We talked for 3 hours. I found him a gentleman kind of a guy, he found me very mature. We discussed about a lot of things, it felt like he is like the missing piece of my jigsaw puzzle. We used to discuss about a lot of things, future, insecurities, past and what not. We both felt we are made for each other. On 9 November, we got engaged.',
  },
]

const TestimonyGrid = () => {
  return (
    <section style={{ backgroundImage: `url(${bg})` }} className='testimony'>
      <div className='container testimonyContainer'>
        <h3 className='sectionHeading'>Testimony</h3>
        <p className='testimonyHeader'>What do people feel about us??</p>
        <div className='testimonial-grid'>
          {data.map((item, i) => (
            <article key={i} className='testimonial flow'>
              <h2 className='name'>{item.name}</h2>

              <p>“ {item.quote} ”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonyGrid
