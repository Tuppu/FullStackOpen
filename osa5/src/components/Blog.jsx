import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const Visibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    console.log(`liked '${blog.title}', but the functionality is not implemented yet!`)
  }
  
  return(
  <div style={blogStyle}>
    <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></div>
    <div style={Visibility}>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={likeBlog}>like</button></div>
      <div>{blog?.user?.name}</div>
    </div>
  </div>  
)}
export default Blog