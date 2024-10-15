const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

commentRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { title: 1})

  response.json(comments)
})

commentRouter.post('/:id/comments', userExtractor, async (request, response) => {

  const { text } = request.body
  
  if (!text) {
    return response.status(400).json({ error: 'missing text' })
  }


  const comment = new Comment({
    text,
    blog: request.params.id
  })

  const savedComment = await comment.save()

  const blog = await Blog
    .findOne({_id: request.params.id})

  blog.comments = blog.comments.concat(savedComment)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentRouter