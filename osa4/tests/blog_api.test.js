const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test.helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('blog has an "id" field', async () => {
  const response = await api.get('/api/blogs')

  const containsOnlyCorrectIdKey = response.body.some(blog => {
    return ('id' in blog && !('_id' in blog))
  })

  assert.strictEqual(containsOnlyCorrectIdKey, true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    'title': 'FSO',
    'author': 'Helsingin yliopisto, Houston Inc., etc.',
    'url': 'https://www.fullstackopen.com',
    'likes': 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const foundUrl = response.body.map(r => r.url)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(foundUrl.includes('https://www.fullstackopen.com'))
})

test('an invalid blog that missing a likes', async () => {
  const newBlog = {
    'title': 'FSO',
    'author': 'Helsingin yliopisto, Houston Inc., etc.',
    'url': 'https://www.fullstackopen.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const foundLikes = response.body.map(r => r.likes)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(foundLikes[response.body.length-1], 0)
})

test('an invalid blog that missing a url', async () => {
  const newBlog = {
    'title': 'FSO',
    'author': 'Helsingin yliopisto, Houston Inc., etc.',
    'likes': 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('an invalid blog that missing a title', async () => {
  const newBlog = {
    'author': 'Helsingin yliopisto, Houston Inc., etc.',
    'url': 'https://www.fullstackopen.com',
    'likes': 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})