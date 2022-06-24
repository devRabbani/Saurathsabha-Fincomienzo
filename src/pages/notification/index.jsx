import useTitle from '../../hooks/useTitle'

export default function Notification() {
  useTitle('Notification | SaurathSabha')
  return (
    <div className='container pageBody'>
      <h1 className='pageHeading'>Notifications</h1>
      <p className='favListEmpty'>No notifications</p>
    </div>
  )
}
