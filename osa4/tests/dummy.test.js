const { test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
    {
      '_id': '66e96b86e77085528c3db190',
      'title': 'eka',
      'author': 'Tuomas Liikala',
      'url': 'https://www.tuppu.fi',
      'likes': 100,
      '__v': 0
    }
  ]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})