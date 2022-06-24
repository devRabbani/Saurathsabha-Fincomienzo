export default function SocialInfo({
  handleChange,
  instagram,
  facebook,
  linkedin,
  email,
  twitter,
  setPage,
}) {
  return (
    <>
      <div className='form-group'>
        <label className='text-muted'>Your Instagram handle Profile Link</label>
        <input
          type='text'
          placeholder='Eg: https://www.instagram.com/userid'
          onChange={handleChange}
          value={instagram}
          name='instagram'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Facebook Profile Link</label>
        <input
          type='text'
          placeholder='Eg: https://www.facebook.com/userid'
          onChange={handleChange}
          value={facebook}
          name='facebook'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Twitter handle Profile Link</label>
        <input
          type='text'
          placeholder='Eg: https://twitter.com/userid'
          onChange={handleChange}
          value={twitter}
          name='twitter'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Linkedin Profile Link</label>
        <input
          type='text'
          placeholder='Eg: https://www.linkedin.com/in/userid'
          onChange={handleChange}
          value={linkedin}
          name='linkedin'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Personal Email Id</label>
        <input
          type='text'
          placeholder='Eg: example@gmail.com'
          onChange={handleChange}
          value={email}
          name='email'
        />
      </div>

      <div className='btnDiv'>
        <button className='btn' onClick={() => setPage(2)}>
          Prev
        </button>
        <button onClick={() => setPage(4)} className='btn'>
          Next
        </button>
      </div>
    </>
  )
}
