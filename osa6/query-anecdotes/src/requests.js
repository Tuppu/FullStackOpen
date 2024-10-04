import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = async (anecdote) => {
    const fetchAnecdote = await axios.get(`${baseUrl}/${anecdote.id}`).then(res => res.data)
    const voteAnecdote = {...fetchAnecdote, votes: fetchAnecdote.votes + 1 ?? 1}
    axios.put(`${baseUrl}/${anecdote.id}`, voteAnecdote).then(res => res.data)
}