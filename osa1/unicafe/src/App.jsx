import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
    const all = updatedGood + neutral + bad;
    setAll(all)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
    const all = good + updatedNeutral + bad;
    setAll(all)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
    const all = good + neutral + updatedBad;
    setAll(all)
  }

  const calculateAvarage = () => {
    return all > 0 ? ((good - bad) / all) : 0;
  }

  const calculatePositivePercentage = () => {
    return all > 0 ? (good / all * 100) : 0;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'>
        
      </Button >
      <Button handleClick={handleNeutralClick} text='neutral'>
        
      </Button >
      <Button handleClick={handleBadClick} text='bad'>
        
      </Button >
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {calculateAvarage()}</div>
      <div>positive {calculatePositivePercentage()} %</div>
    </div>
  )
}

export default App