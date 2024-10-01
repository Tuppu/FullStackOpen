import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecodoteList = () => {
    
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        const filteredState = state.anecdotes.filter(a => a.content.includes(state.filter))
        return filteredState.sort((a, b) => b.votes - a.votes)
    })
    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecodoteList