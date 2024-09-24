const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    switch (type) {
      case 'success':
        return (
          <div className={type}>
            {message}
          </div>
        )
      case 'error':
      default:
        return (
          <div className="error">
            {message}
          </div>
        )
    }
    
  }

  export default Notification;