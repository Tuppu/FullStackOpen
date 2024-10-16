import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import {
  TextField,
  Button,
  Input,
  TextareaAutosize,
  List,
  ListItem,
} from '@mui/material'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return <div>Blog not found</div>
  }

  const user = useSelector((state) => {
    return state.user
  })

  const clickLike = async (likedBlog) => {
    try {
      const updatedBlog = {
        likes: parseInt(likedBlog.likes) + 1,
      }

      await blogService.update(updatedBlog, likedBlog.id)
      const newBlogs = await blogService.getAll()

      dispatch(updateBlogs(newBlogs))

      dispatch(setNotification(`likes ${likedBlog.title}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification(exception?.response?.data?.error, 'error', 5))
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

  const addComment = async (event) => {
    event.preventDefault()

    const newComment = { text: event.target.comment.value }

    const result = await blogService.createNewCommentbyBlogId(
      newComment,
      blog.id,
    )

    const newBlogs = await blogService.getAll()

    dispatch(updateBlogs(newBlogs))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div className="blogLikes">
        {blog.likes} likes <Button onClick={() => clickLike(blog)}>like</Button>
      </div>
      <div className="blogUserName">added by {blog?.user?.name}</div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <TextareaAutosize name="comment" />
        </div>
        <Button type="submit">add comment</Button>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem>{comment.text}</ListItem>
        ))}
      </List>
      <div>
        <Button onClick={() => clickDelete(blog)} style={DeleteVisibility}>
          remove
        </Button>
      </div>
    </div>
  )
}
export default BlogView
