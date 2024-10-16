import { useState } from 'react'
import { TextField, Button, Input } from '@mui/material'

const BlogForm = ({ createNewBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitleChange = (event) => {
    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleAuthorChange = (event) => {
    const newAuthor = event.target.value
    setAuthor(newAuthor)
  }

  const handleUrlChange = (event) => {
    const newUrl = event.target.value
    setUrl(newUrl)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <Input
            label="title"
            data-testid="blogTitle"
            value={newTitle}
            placeholder="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <Input
            label="author"
            data-testid="blogAuthor"
            value={newAuthor}
            placeholder="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <Input
            label="url"
            data-testid="blogUrl"
            value={newUrl}
            placeholder="url"
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
