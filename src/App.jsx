import './App.css'
import Cards from './cards'
import { useState } from 'react'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clicked, setClicked] = useState([])

  return (
    <>
      <div className='max-h-screen m-0 py-10 px-40 flex flex-col'>
        <div className='text-center text-5xl'>The Memory Game</div>
        <div className='text-center pt-5'>Can you score all 18 points?</div>
        <div className='text-2xl'>Current Score: {currentScore}</div>
        <div className='text-2xl'>Best score: {bestScore}</div>
      <Cards currentScore={currentScore} bestScore={bestScore} setCurrentScore={setCurrentScore} setBestScore={setBestScore} clicked={clicked} setClicked={setClicked}/>
      </div>
    </>
  )
}

export default App
