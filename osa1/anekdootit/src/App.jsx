import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //let votes = new Array(anecdotes.length).fill(0);
   
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdoteClick = () => {
    const updatedSelected = getRandomInt(anecdotes.length);
    setSelected(updatedSelected)
  }

  const handleVoteAnecdoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>{votes[selected]}</div>
      <Button handleClick={handleVoteAnecdoteClick} text='vote' />
      <Button handleClick={handleNextAnecdoteClick} text='next anecdote' />
    </div>
  )
}

export default App