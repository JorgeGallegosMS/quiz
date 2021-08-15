import { useState } from 'react'
import questions from '../questions/index'
import Answer from './Answer'

const Quiz = () => {
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const correctAnswerIndex = done ? null : questions[question].correctAnswer
  let correctAnswer = correctAnswerIndex >= 0 ? questions[question].answerOptions[correctAnswerIndex] : null

  const resetQuiz = () => {
    setDone(!done)
    setChosenAnswer(null)
    setShowAnswer(false)
    setScore(0)
    setQuestion(0)
  }

  const handleAnswer = e => {
    const answer = e.target.innerText
    setChosenAnswer(answer)
    setShowAnswer(!showAnswer)

    if (answer === correctAnswer) setScore(score+1)
  }

  return (
    <>
      {done ? (
        <>
          <div className='questionTitle'>
            {`${score}/${questions.length} questions answered correctly`}
          </div>
          <button className='answer' onClick={e => resetQuiz()}>Try again</button>
        </>
      ) : (
        <div className='question'>
          <div className={`questionTitle ${chosenAnswer && chosenAnswer === correctAnswer ? 'green' : chosenAnswer && chosenAnswer !== correctAnswer ? 'red' : ''}`}>
            {questions[question].questionText}
          </div>
          <div className='answers'>
            {questions[question].answerOptions.map(answer => <Answer 
                                                              key={answer}
                                                              showAnswer={showAnswer} 
                                                              correctAnswer={correctAnswer} 
                                                              answer={answer} 
                                                              chosenAnswer={chosenAnswer} 
                                                              handleAnswer={handleAnswer}/>)
            }
          </div>

          <button className='answer' onClick={e => {
            if (question === questions.length-1) {
              setDone(!done)
            } else {
              setShowAnswer(!showAnswer)
              setChosenAnswer(null)
              setQuestion(question+1)
            }
          }}>{`${question+1}/${questions.length}`}  &#8594;</button>
        </div> 
      )}
    </>
  )
}

export default Quiz
