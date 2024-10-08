import { UseNotificationValue }  from '../NotificationContext'

const Notification = () => {

  const notification = UseNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? '' : 'none' 
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
