import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    'title': 'testTitle',
    'author': 'testAuthor',
    'url': 'https://www.test.fi',
    'likes': 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testTitle testAuthor')
  expect(element).toBeDefined()
})