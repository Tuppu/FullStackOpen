const { test, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

test.only('a valid blog can be added ', async () => {
  const newBlog = {
    'title': 'FSO',
    'author': 'Helsingin yliopisto, Houston Inc., etc.',
    'url': 'https://www.fullstackopen.com',
    'likes': 11
  }

  const responseInitial = await api.get('/api/blogs')
  const initialCnt = responseInitial.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAfterAdd = await api.get('/api/blogs')

  const foundUrl = responseAfterAdd.body.map(r => r.url)

  assert.strictEqual(responseAfterAdd.body.length, initialCnt + 1)

  assert(foundUrl.includes('https://www.fullstackopen.com'))
})

after(async () => {
  await mongoose.connection.close()
})