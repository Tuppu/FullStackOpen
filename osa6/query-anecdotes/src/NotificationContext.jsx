import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
          return action.message
      case "HIDE":
      default:
          return ''
    }
  }

const NotificationContext = createContext()

export const UseNotificationValue = () => {
    const notificationDispatch = useContext(NotificationContext)
    return notificationDispatch[0]
  }
  
  export const UseNotificationDispatch = () => {
    const notificationDispatch = useContext(NotificationContext)
    return notificationDispatch[1]
  }

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export default NotificationContext