let _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length ?? 0
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0
  return blogs.reduce((total, { likes }) => total + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null
  const maxLikedBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

  return maxLikedBlog
}

const mostBlogs = (blogs) => {

  if (!blogs.length) return null

  let authBlogs = _.groupBy(blogs, 'author')
  let ordered = _.orderBy(authBlogs, 'length', 'desc')
  let mostBlogs = ordered[0]

  let theAuthor = {
    author: mostBlogs[0].author,
    blogs: mostBlogs.length
  }

  return theAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}