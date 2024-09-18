const dummy = (blogs) => {
  return blogs.length ?? 0
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0
  return blogs.reduce((total, { likes }) => total + likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}