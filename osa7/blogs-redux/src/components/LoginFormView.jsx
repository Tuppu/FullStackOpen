import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import Footer from './Footer'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import { updateBlogs } from '../reducers/blogsReducer'
import { TextField, Button } from '@mui/material'

const LoginFormView = () => {
  const dispatch = useDispatch()

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

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div style={hideWhenVisible}>
        <Button onClick={() => setLoginVisible(true)}>log in</Button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm />
        <Button onClick={() => setLoginVisible(false)}>cancel</Button>
      </div>
      <Footer />
    </div>
  )
}

export default LoginFormView
