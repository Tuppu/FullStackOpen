import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  if (!blogs) {
    return <div></div>
  }

  return blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      //deleteBlog={() => deleteBlog(blog.id)}
      //likeBlog={() => likeBlog(blog.id)}
      //user={user}
    />
  ))
}

export default Blogs
