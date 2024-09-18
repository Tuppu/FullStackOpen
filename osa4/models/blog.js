const blogs = require('mongoose')

const blogSchema = blogs.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = blogs.model('Blog', blogSchema)