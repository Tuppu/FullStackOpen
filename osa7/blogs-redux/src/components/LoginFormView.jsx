import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import Footer from './Footer'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogs } from '../reducers/blogsReducer'
import { updateUser } from '../reducers/userReducer'

const LoginFormView = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => {
    return state.user
  })
  const [loginVisible, setLoginVisible] = useState(false)

  blogService.getAll().then((blogs) => {
    const orderedBlogs = blogs.sort(
      (a, b) => parseInt(b.likes) - parseInt(a.likes),
    )

    dispatch(updateBlogs(orderedBlogs))
  })

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(updateUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'error', 5))
    }
  }

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      <Footer />
    </div>
  )
}

export default LoginFormView
