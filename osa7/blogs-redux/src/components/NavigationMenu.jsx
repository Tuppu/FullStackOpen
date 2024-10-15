import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../reducers/userReducer'

const NavigationMenu = () => {
  const dispatch = useDispatch()

  const padding = {
    padding: 5,
  }

  const navBar = {
    backgroundColor: 'lightgrey',
    padding: 4,
  }

  const logUserOut = () => {
    dispatch(updateUser(null))
  }

  const user = useSelector((state) => {
    return state.user
  })

  return (
    <div style={navBar}>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in <button onClick={() => logUserOut()}>logout</button>
    </div>
  )
}
export default NavigationMenu
