import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')      
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.hideVisibility();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000) 
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle)
  }

  const handleAuthorChange = (event) => {
    const newAuthor = event.target.value;
    setAuthor(newAuthor)
  }

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <Notification message={successMessage ?? errorMessage} type={successMessage ? 'success' : 'error'} />
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
      </div>
    )
  }

  if (user === null) {
    return (loginForm())
  }

  return (
    <div>
      <h1>blogs</h1>
        <Notification message={successMessage ?? errorMessage} type={successMessage ? 'success' : 'error'} />
        <p>{user.name} logged in <button onClick={() => logUserOut()}>logout</button></p>
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <h1>create new</h1>
          <form onSubmit={createNewBlog}>
            <div>
              title:<input value={newTitle} onChange={handleTitleChange} />
            </div>
            <div>
              author:<input value={newAuthor} onChange={handleAuthorChange} />
            </div>
            <div>
              url:<input value={newUrl} onChange={handleUrlChange} />
            </div>
            <div>
              <button type="submit">create</button>
            </div>
          </form>
        </Toggleable>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App