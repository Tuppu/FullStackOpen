const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'eka',
    'author': 'Tuomas Liikala',
    'url': 'https://www.tuppu.fi',
    'likes': 100
  },
  {
    'title': 'toka',
    'author': 'YLE',
    'url': 'https://www.yle.fi',
    'likes': 1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}