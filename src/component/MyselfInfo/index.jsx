const MyselfInfo = ({
  bio,
  hobbies,
  isSmoker,
  isAlcoholic,
  handleChange,
  setPage,
  videolink,
}) => {
  const invalid = bio === '' || hobbies === ''

  return (
    <>
      <div className='form-group'>
        <label className='text-muted'>Describe About Yourself :</label>
        <textarea
          onChange={handleChange}
          name='bio'
          rows={5}
          value={bio}
          placeholder='Hey I am an Engineer from Bangalore, I Want ...'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Hobbies :</label>
        <textarea
          onChange={handleChange}
          name='hobbies'
          rows={2}
          value={hobbies}
          placeholder='singing , watching movie , dancing ...'
          className='form-control'
        />
      </div>
      <div className='formHorizontal habbit'>
        <div className='form-group'>
          <label className='text-muted'>Do you smoke ? :</label>
          <select value={isSmoker} onChange={handleChange} name='isSmoker'>
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Are you Alcoholic ? :</label>
          <select
            value={isAlcoholic}
            onChange={handleChange}
            name='isAlcoholic'
          >
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>
        </div>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Your Video Profile Link :</label>
        <input
          type='text'
          onChange={handleChange}
          name='videolink'
          value={videolink}
          placeholder='Paste your link to your video'
          className='form-control'
        />
      </div>
      <div className='btnDiv'>
        <button onClick={() => setPage(1)} className='btn'>
          Prev
        </button>
        <button
          disabled={invalid}
          onClick={() => setPage(3)}
          className={`btn ${invalid && 'disabled'}`}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default MyselfInfo
