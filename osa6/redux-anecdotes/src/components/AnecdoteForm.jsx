import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecodoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createAnecdote(content))
        dispatch(showNotification((`${content} added`)))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="content" /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecodoteForm