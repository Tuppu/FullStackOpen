import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = ({ blog, user }) => {
  const dispatch = useDispatch()

  if (!blog || !user) {
    return <div>Blog not found</div>
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

  const DeleteVisibility = {
    display: !blog.user || user?.name === blog?.user?.name ? '' : 'none',
  }

  return (
    <div>
      <h2>{blog.title}</h2>
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
  )
}
export default BlogView
