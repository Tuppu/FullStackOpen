import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogs } from '../reducers/blogsReducer'
import Blogs from '../components/Blogs'

const BlogFormView = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

  const blogFormRef = useRef()

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
      <Blogs user={user} />
    </div>
  )
}

export default BlogFormView
