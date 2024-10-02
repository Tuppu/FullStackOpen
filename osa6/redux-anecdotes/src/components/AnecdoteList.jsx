import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecodoteList = () => {

    const exensiveFiltering = (anecdotes, filterPayload) => {
        const filteredState = anecdotes.filter(a => a.content.includes(filterPayload))
        return filteredState
    }

    const exensiveSorting = (filteredState) => {
        const sortFilteredState = filteredState.sort((a, b) => b.votes - a.votes)
        return sortFilteredState
    }

    const dispatch = useDispatch()
    const anecdotes = useSelector(( state )  => {
        const stateAnecdotes = state.anecdotes
        const filterPayload = state.filter.payload
        const filteredState = exensiveFiltering(stateAnecdotes, filterPayload)
        const sortFilteredState = exensiveSorting(filteredState)

        return sortFilteredState
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