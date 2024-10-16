import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? '' : 'none',
  }
  return (
    <Alert
      severity="success"
      className={notification.messageType}
      style={style}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
