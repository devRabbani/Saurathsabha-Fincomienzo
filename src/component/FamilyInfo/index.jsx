import { FaTimes } from 'react-icons/fa'

const FamilyInfo = ({
  fatherName,
  fatherProfession,
  siblings,
  grandFather,
  gautra,
  maul,
  setPage,
  handleChange,
  handleSibb,
  handleRemove,
  handleSibbsChange,
}) => {
  const invalid =
    fatherName === '' ||
    fatherProfession === '' ||
    grandFather === '' ||
    gautra === '' ||
    maul === ''

  return (
    <>
      <div className='form-group'>
        <label className='text-muted'>Father Name :</label>
        <input
          onChange={handleChange}
          type='text'
          name='fatherName'
          value={fatherName}
          placeholder='Enter your Father Name'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Father Profession :</label>
        <input
          onChange={handleChange}
          type='text'
          name='fatherProfession'
          value={fatherProfession}
          placeholder='Enter Your Father Profession'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Grandfather Name :</label>
        <input
          onChange={handleChange}
          type='text'
          name='grandFather'
          value={grandFather}
          placeholder='Enter Your Grandfather Name'
          className='form-control'
        />
      </div>
      <div className='formHorizontal'>
        <div className='form-group'>
          <label className='text-muted'>Gautra :</label>
          <input
            onChange={handleChange}
            type='text'
            name='gautra'
            value={gautra}
            placeholder='Enter your Gautra'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Maul :</label>
          <input
            onChange={handleChange}
            type='text'
            name='maul'
            value={maul}
            placeholder='Enter Your Maul'
            className='form-control'
          />
        </div>
      </div>
      {siblings.map((item, i) => (
        <div key={i} className='form-group siblingGroup'>
          <label className='text-muted'>Sibbling {i + 1} :</label>
          <div className='formHorizontal triple'>
            <select
              onChange={(e) => handleSibbsChange(i, e)}
              name='age'
              value={item.age}
            >
              <option value=''>Age</option>
              <option value='elder'>Elder</option>
              <option value='older'>Older</option>
            </select>
            <select
              onChange={(e) => handleSibbsChange(i, e)}
              name='relation'
              value={item.relation}
            >
              <option value=''>Relation</option>
              <option value='sister'>Sister</option>
              <option value='brother'>Brother</option>
            </select>
            <select
              onChange={(e) => handleSibbsChange(i, e)}
              name='status'
              value={item.status}
            >
              <option value=''>Current Status</option>
              <option value='sister'>Studying</option>
              <option value='married'>Married</option>
              <option value='not-married'>Not-Married</option>
              <option value='salaried-and-married'>Salaried and Married</option>
              <option value='salaried-and-not-married'>
                Salaried and Not Married
              </option>
            </select>
            <div onClick={(e) => handleRemove(e, i)} className='removeSibbs'>
              <FaTimes />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleSibb} className='btn sibb'>
        Add Sibblings
      </button>
      <div className='btnDiv'>
        <button onClick={() => setPage(0)} className='btn half'>
          Prev
        </button>
        <button
          disabled={invalid}
          onClick={() => setPage(2)}
          className={`btn half ${invalid && 'disabled'}`}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default FamilyInfo
