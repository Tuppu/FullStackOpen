import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const clickLike = async (likedBlog) => {
    try {
      const updatedBlog = {
        ...likedBlog,
        user: likedBlog?.user?.id,
        likes: parseInt(likedBlog.likes) + 1,
      }

      await blogService.update(updatedBlog, likedBlog.id)
      const newBlogs = await blogService.getAll()

      dispatch(updateBlogs(newBlogs))

      dispatch(setNotification(`likes ${updatedBlog.title}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'errpr', 5))
    }
  }

  const clickDelete = async (deleteBlog) => {
    try {
      if (!window.confirm(`Delete ${deleteBlog.title}`)) {
        return
      }

      await blogService.remove(deleteBlog.id)
      const newBlogs = await blogService.getAll()
      await dispatch(updateBlogs(newBlogs))

      dispatch(
        setNotification(
          `a blog ${deleteBlog.title} by ${deleteBlog.author} removed`,
          'success',
          5,
        ),
      )
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'error', 5))
    }
  }

  const [visible, setVisible] = useState(false)

  const Visibility = { display: visible ? '' : 'none' }

  const DeleteVisibility = {
    display: !blog.user || user?.name === blog?.user?.name ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="blogDetails" style={Visibility}>
        <div>{blog.url}</div>
        <div className="blogLikes">
          {blog.likes} <button onClick={() => clickLike(blog)}>like</button>
        </div>
        <div className="blogUserName">{blog?.user?.name}</div>
        <div>
          <button onClick={() => clickDelete(blog)} style={DeleteVisibility}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}
export default Blog
