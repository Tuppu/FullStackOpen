import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/BookRecommendations"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_GENRE, ME, BOOK_ADDED } from "./queries"

const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const hideWhenLogin = { display: token ? "none" : "" }
  const showWhenLogin = { display: token ? "" : "none" }

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)
  const resultBooksByGenre = useQuery(ALL_BOOKS_BY_GENRE, { variables: { genre: meResult?.data?.me?.favoriteGenre ?? "" } })

  if (token && page === "login") {
    setPage("authors")
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`book '${addedBook.title}' added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  if (resultAuthors.loading || resultBooks.loading || meResult.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button style={showWhenLogin} onClick={() => setPage("add")}>
          add book
        </button>
        <button style={showWhenLogin} onClick={() => setPage("recommend")}>
          recommend
        </button>
        <button style={hideWhenLogin} onClick={() => setPage("login")}>
          Login
        </button>
        <button style={showWhenLogin} onClick={logout}>
          logout
        </button>
      </div>

      <Authors show={page === "authors"} allAuthors={resultAuthors.data.allAuthors} setError={notify} />

      <Books show={page === "books"} allBooks={resultBooks.data.allBooks} />

      <NewBook show={page === "add" && token} setError={notify} />

      <Recommend
        show={page === "recommend" && token}
        favoriteBooks={resultBooksByGenre.data.allBooks ?? []}
        favoriteGenre={meResult?.data?.me?.favoriteGenre ?? ""}
      />

      <LoginForm show={page === "login"} setToken={setToken} setError={notify} />
    </div>
  )
}

export default App
