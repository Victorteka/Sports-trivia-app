import React from 'react'
import { AnswerObject } from '../App'
import { ButtonWrapper, Wrapper } from './Question.styles'

type Props = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNo: number
    totalQuestions: number
}

const QuestionsCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNo,
    totalQuestions
}) => {
    return (
        <Wrapper>
            <p className='number'>{questionNo}/{totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html:question}} ></p>
            <div>
                {answers.map((answer, i)=>(
                    <ButtonWrapper 
                     correct = {userAnswer?.correctAnswer=== answer}
                     userClicked = {userAnswer?.answer === answer}
                     key={i}>
                        <button disabled={userAnswer? true: false} value={answer}  onClick={callback} >
                            <span dangerouslySetInnerHTML={{__html: answer}} />
                        </button>
                    </ButtonWrapper 
                    >
                ))}
            </div>
        </Wrapper>
    )
}

export default QuestionsCard
