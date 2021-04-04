import React, { MouseEvent, useState } from 'react';
import { Difficulty, fetchQuizQeustions, QuestionState } from '../utils/API';

import { TOTAL_QUESTIONS } from '../utils/constants';
import { GlobalStyles, Wrapper } from './App.styles';
import Header from './header/Header';
import QuestionsCard from './questions/QuestionsCard';


export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App =() => {

    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const startTrivia = async() =>{
      setLoading(true)
      setGameOver(false)

      const newQuestions =  await fetchQuizQeustions(TOTAL_QUESTIONS, Difficulty.EASY)
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
    }

    const checkAnswer = (e: MouseEvent<HTMLButtonElement>) =>{
      if(!gameOver){
        const answer = e.currentTarget.value
        const correct = questions[number].correct_answer === answer
        if(correct) setScore(prev=> prev + 1)

        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer
        }
        setUserAnswers(prev =>[...prev, answerObject])
      }
    }

    const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) =>{
      const nextQuestion = number + 1
      if(nextQuestion === TOTAL_QUESTIONS){
        setGameOver(true)
      }else{
        setNumber(nextQuestion)
      }
    }

  return (
    <div>
      <Header/>
      <GlobalStyles />
      <div className="home__content">
        <Wrapper>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS?(
          <button className='start' onClick={startTrivia}>Start</button>
          ):
        null}
        {!gameOver ?<h3 className='score'>Score: {score}</h3>: null}
        {loading && <h3>Loading Questions ...</h3>}
        {!loading && !gameOver &&(<QuestionsCard 
          questionNo={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers? userAnswers[number]: undefined}
          callback={checkAnswer}
        />)}
        {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 &&
          (<button className='next' onClick={nextQuestion}>Next Question</button>)
        }
        </Wrapper>
      </div>
    </div>
  );
}

export default App;
