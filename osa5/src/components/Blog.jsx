import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrorMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [_blog, setBlog] = useState([])
  const [visible, setVisible] = useState(false)

  const Visibility = { display: visible ? '' : 'none' }

  useEffect(() => {
    setBlog(blog)
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const likeBlog = async () => {
    try {
      const updatedBlog = { ..._blog, user: _blog?.user?.id, likes: parseInt(_blog.likes) + 1 }
      const returnedBlog = await blogService.update(updatedBlog, _blog.id)
      setBlog(returnedBlog)    
      //setBlog({ ..._blog, likes: returnedBlog.likes })    
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  return(
  <div style={blogStyle}>
    <div>{_blog.title} {_blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></div>
    <div style={Visibility}>
      <div>{_blog.url}</div>
      <div>{_blog.likes} <button onClick={likeBlog}>like</button></div>
      <div>{_blog?.user?.name}</div>
    </div>
  </div>  
)}
export default Blog