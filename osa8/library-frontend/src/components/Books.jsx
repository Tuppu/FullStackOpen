import { useState } from "react"

const Books = ({ allBooks, show }) => {
  const [genreState, setGenre] = useState("")

  if (!show) {
    return null
  }

  let genres = []
  for (const book of allBooks) {
    genres = genres.concat(book.genres)
  }

  let books = allBooks
  if (genreState) {
    books = allBooks.filter((book) => {
      const found = book.genres.includes(genreState)
      if (found) return book
    })
  }

  const addGenre = (genre) => {
    setGenre(genre?.target?.value ?? "")
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a?.author?.id}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} value={genre} onClick={(genre) => addGenre(genre)} type='button'>
          {genre}
        </button>
      ))}
      <button value='' onClick={() => addGenre()} type='button'>
        all genres
      </button>
    </div>
  )
}

export default Books