import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginFormView from './components/LoginFormView'
import Blogs from './components/Blogs'
import NavigationMenu from './components/NavigationMenu'
import blogService from './services/blogs'
import { updateBlogs } from './reducers/blogsReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
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

  if (!user) {
    return <LoginFormView />
  }

  return (
    <div>
      <Notification />
      <Router>
        <NavigationMenu />
        <h3>Blogs app</h3>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blogs />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
