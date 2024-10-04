import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { createContext, useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const successNotification = (content) => {
    dispatch({ type: "SHOW", message: `anecdote '${content}' created`})
    setTimeout(() => {
      dispatch({ type: "HIDE"})
    }, 5000)
  }

  const errorNotification = (error) => {
    dispatch({ type: "SHOW", message: error.response.data.error})
    setTimeout(() => {
      dispatch({ type: "HIDE"})
    }, 5000)
  }

  const newAnecodteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (notifcation) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      successNotification(notifcation.content)
    },
    onError: (error) => {
      errorNotification(error)
    }
  })

  const onCreate = (event) => {

    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecodteMutation.mutate({ content, votes: '' })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
