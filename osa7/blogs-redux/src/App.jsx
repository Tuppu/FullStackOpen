import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const orderedBlogs = blogs.sort(
        (a, b) => parseInt(b.likes) - parseInt(a.likes),
      )

      setBlogs(orderedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getAllBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    const orderedBlogs = updatedBlogs.sort(
      (a, b) => parseInt(b.likes) - parseInt(a.likes),
    )
    setBlogs(orderedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'error', 5))
    }
  }

  const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createNewBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.hideVisibility()
      dispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'success',
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          exception?.response?.data?.error ??
            exception?.response?.data?.message,
          'error',
          5,
        ),
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      const deletingBlog = await blogs.find((blog) => blog.id === id)

      if (!window.confirm(`Delete ${deletingBlog.title}`)) {
        return
      }
      await blogService.remove(deletingBlog.id)
      await getAllBlogs()

      dispatch(
        setNotification(
          `a blog ${deletingBlog.title} by ${deletingBlog.author} removed`,
          'error',
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          exception?.response?.data?.error ??
            exception?.response?.data?.message,
          'error',
          5,
        ),
      )
    }
  }

  const likeBlog = async (id) => {
    try {
      const likedBlog = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...likedBlog,
        user: likedBlog?.user?.id,
        likes: parseInt(likedBlog.likes) + 1,
      }
      await blogService.update(updatedBlog, likedBlog.id)
      getAllBlogs()
      dispatch(setNotification(`likes ${updatedBlog.title}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'errpr', 5))
    }
  }

  const loginForm = () => {
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

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button onClick={() => logUserOut()}>logout</button>
      </p>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={() => deleteBlog(blog.id)}
          likeBlog={() => likeBlog(blog.id)}
          user={user}
        />
      ))}
      <Footer />
    </div>
  )
}

export default App
