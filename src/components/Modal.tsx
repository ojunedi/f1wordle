import React from 'react'


interface ModalProps {
    isCorrect: boolean
    turn: number
    solution: string
}

export const Modal = ({isCorrect, turn, solution}: ModalProps) => {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
               <h1>You Win!</h1> 
               <p className='solution'>{solution}</p>
               <p>You found the solution in {turn} guesses :)</p>
            </div>
        )}
        {!isCorrect && (
            <div>
               <h1>Nevermind!</h1> 
               <p className='solution'>{solution}</p>
               <p>Better luck next time!</p>
            </div>
        )}
    </div>
  )
}
