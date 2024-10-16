import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../reducers/userReducer'
import { AppBar, Toolbar, Button, IconButton } from '@mui/material'

const NavigationMenu = () => {
  const dispatch = useDispatch()

  const logUserOut = () => {
    dispatch(updateUser(null))
  }

  const user = useSelector((state) => {
    return state.user
  })

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <em>
            {user.name} logged in{' '}
            <Button color="inherit" onClick={() => logUserOut()}>
              logout
            </Button>
          </em>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default NavigationMenu
