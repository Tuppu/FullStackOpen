import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  if (!blogs) {
    return <div></div>
  }

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
}

export default Blogs
