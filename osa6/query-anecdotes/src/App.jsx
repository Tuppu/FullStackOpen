import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'

const App = () => {
  
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const voteAnecodteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  
  const handleVote = (anecdote) => {
    voteAnecodteMutation.mutate(anecdote)

    dispatch({ type: "SHOW", message: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({ type: "HIDE"})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
