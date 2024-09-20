const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0
  })

  const savedNote = await blog.save()
  response.status(201).json(savedNote)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body,
    { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter