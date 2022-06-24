import { useRef, useState } from 'react'

export default function WhyusColumn({ children, img, title }) {
  const [isFold, setIsFold] = useState(true)
  const headerRef = useRef()
  const handleFold = () => {
    headerRef.current.scrollIntoView()
    setIsFold(true)
  }
  return (
    <>
      <div ref={headerRef} className='whycard'>
        <div className='imgcard'>
          <img src={img} alt='whyus' />
        </div>
        <h3>{title}</h3>
        {isFold ? (
          <>
            <p>{children.substring(0, 200)}....</p>
            <span onClick={() => setIsFold(false)}>read more</span>
          </>
        ) : (
          <>
            <p>{children}</p>
            <span onClick={handleFold}>Close</span>
          </>
        )}
      </div>
    </>
  )
}
