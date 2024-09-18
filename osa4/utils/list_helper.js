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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}