const Answer = ({showAnswer, correctAnswer, answer, chosenAnswer, handleAnswer}) => {
  return (
    <button className={`answer ${showAnswer && (correctAnswer === answer) ? 'correct' : 'wrong'}`} 
            key={answer} 
            onClick={handleAnswer} 
            disabled={!!chosenAnswer}>{answer}
    </button>
  )
}

export default Answer
