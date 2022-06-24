const ExpectationInfo = ({
  isDowryFree,
  isLikeGrand,
  isPartDowry,
  isSupportWidower,
  opinion,
  handleChange,
  setPage,
  setPhotoUpld,
}) => {
  return (
    <>
      <div className='form-group'>
        <label className='text-muted'>
          Would you like to promote dowry free marriage ? :
        </label>
        <select onChange={handleChange} name='isDowryFree' value={isDowryFree}>
          <option value='no'>No</option>
          <option value='yes'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>
          Would you support widow / widower marriage? :
        </label>
        <select
          onChange={handleChange}
          name='isSupportWidower'
          value={isSupportWidower}
        >
          <option value='no'>No</option>
          <option value='yes'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>
          Would you like to be part of dowry-free marriage ? :
        </label>
        <select onChange={handleChange} value={isPartDowry} name='isPartDowry'>
          <option value='no'>No</option>
          <option value='yes'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>
          Do you subscribe the idea of grand marriage ? :
        </label>
        <select onChange={handleChange} value={isLikeGrand} name='isLikeGrand'>
          <option value='no'>No</option>
          <option value='yes'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>
          Any other opinion you have on maithil marriage system ? :
        </label>
        <textarea
          name='opinion'
          value={opinion}
          onChange={handleChange}
          placeholder='optional'
        />
      </div>
      <div className='btnDiv'>
        <button className='btn' onClick={() => setPage(3)}>
          Prev
        </button>
        <button onClick={() => setPhotoUpld(true)} className='btn'>
          Continue
        </button>
      </div>
      {/* <button className='btn finish'>Finish Setup Profile</button> */}
    </>
  )
}

export default ExpectationInfo
