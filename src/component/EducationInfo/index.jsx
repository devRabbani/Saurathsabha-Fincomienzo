const EducationInfo = ({
  highestQual,
  yearComplete,
  currentJob,
  income,
  department,
  handleChange,
  setPage,
}) => {
  const invalid =
    highestQual === '' ||
    yearComplete === '' ||
    currentJob === '' ||
    income === '' ||
    department === ''
  return (
    <>
      <div className='form-group'>
        <label className='text-muted'>Qualification :</label>
        <input
          type='text'
          placeholder='Highest Qualification'
          onChange={handleChange}
          value={highestQual}
          name='highestQual'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Completion Year :</label>
        <input
          onChange={handleChange}
          type='text'
          name='yearComplete'
          value={yearComplete}
          placeholder='Enter Year of Completion'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Current Job :</label>
        <input
          onChange={handleChange}
          type='text'
          name='currentJob'
          value={currentJob}
          placeholder='Enter your Current Job'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Depertment of Job :</label>
        <input
          onChange={handleChange}
          type='text'
          name='department'
          value={department}
          placeholder='Enter Depertment of  your Job'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Estimated Annual Income :</label>
        <input
          onChange={handleChange}
          type='text'
          name='income'
          value={income}
          placeholder='Enter your annual estimated income'
          className='form-control'
        />
      </div>
      <button
        disabled={invalid}
        className={`btn continue ${invalid && 'disabled'}`}
        onClick={() => setPage(1)}
      >
        Continue
      </button>
    </>
  )
}

export default EducationInfo
