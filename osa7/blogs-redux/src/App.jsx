import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginFormView from './components/LoginFormView'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import { updateBlogs } from './reducers/blogsReducer'
import { updateUser } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const padding = {
    padding: 5,
  }
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

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

  const logUserOut = () => {
    dispatch(updateUser(null))
  }

  if (!user) {
    return <LoginFormView />
  }

  return (
    <div>
      <Notification />
      <Router>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>

        <h3>Blogs</h3>

        <p>{user.name} logged in </p>
        <p>
          <button onClick={() => logUserOut()}>logout</button>
        </p>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/blogs" element={<Blogs user={user} />} />
          <Route path="/blogs/:id" element={<Blogs user={user} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
