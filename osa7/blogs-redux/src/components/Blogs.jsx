import Blog from '../components/Blog'
import BlogView from '../components/BlogView'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogs } from '../reducers/blogsReducer'
import { useRef } from 'react'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector((state) => {
    return state.user
  })

  const blogs = useSelector((state) => {
    return state.blogs
  })

  if (!blogs) {
    return <div></div>
  }

  const id = useParams().id
  if (id) {
    const blog = blogs.find((u) => u.id == id)

    if (blog) {
      return <BlogView blog={blog} />
    }
  }

  const getAllBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    const orderedBlogs = updatedBlogs.sort(
      (a, b) => parseInt(b.likes) - parseInt(a.likes),
    )

    dispatch(updateBlogs(orderedBlogs))
  }

  const createNewBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      getAllBlogs()
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

  return (
    <div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Blogs
