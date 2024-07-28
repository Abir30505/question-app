import React, { useRef, useState } from 'react'
import { quiz } from './quizes';

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quiz[index])
  const [lock, setLock] = useState(false)
  const [next, setNextBtn] = useState(false)
  const [result, setResult] = useState(true)
  const [score, setScore] = useState(0)
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const options = [option1, option2, option3, option4]

  function checkAns(e, ans) {
    if (!lock) {
      if (ans == question.ans) {
        e.target.classList.add("correct")
        setScore(score + 1)
      } else {
        e.target.classList.add("wrong")
        options[question.ans - 1].current.classList.add('correct')
      }
    }
    setLock(true)
    setNextBtn(true)
  }

  function nextClick() {
    if (lock) {
      if (index < quiz.length - 1) {
        setIndex(index + 1)
        setQuestion(quiz[index + 1])
        setLock(false)
        setNextBtn(false)
        options.map((option) => {
          option.current.classList.remove("correct")
          option.current.classList.remove("wrong")
        })
      } else {
        setResult(false)
      }
    }
  }
  function resetClick(){
    setLock(false)
    setIndex(0)
    setQuestion(quiz[0])
    setResult(true)
    setScore(0)
  }

  return (
    <div className='quiz-page'>
      <div className="quiz-content">
        <h2>Quiz</h2>
        <hr />
        {result ? <>
          <h4>{index + 1} {question.question}</h4>
          <ul>
            <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>
          <div className='next-btn'>
          {next? <button className='button' onClick={nextClick} disabled={!next}>Next</button>: <></>}
          </div>
        </>
          : <div className='result-container'>
          <p>Your score is {score} out of {quiz.length}</p>
           {score===5 ? <h1>Good Job!</h1>: <h1>not bad!</h1>}
          <button onClick={resetClick} className='button'>play again</button>
          </div>}
      </div>
    </div>
  )
}

export default Quiz;