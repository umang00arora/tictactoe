import React from 'react'
import '../App.css'
import './Styles.css'

const Status = ({winner, gamingBoard}) => {
  const {squares,isXNext}=gamingBoard
    const noMovesLeft =squares.every(squareValue => squareValue!=null)
    const nextPlayer=isXNext?'X':'O';
    const renderStatusMessage=()=>{
        if(winner){
            return <h2><span className={winner === 'X'?'text-orange':'text-green'}>Winner is {winner}</span></h2>
        }
        if(!winner && noMovesLeft){
            return <h2><span className="text-green">O</span> and <span className="text-orange">X</span> Tied</h2>
        }
        if(!winner && !noMovesLeft){
            return <h2>Next Player is <span className={isXNext?'text-orange':'text-green'}>{nextPlayer}</span></h2>
        }
    }
  return (
    <div>
      {renderStatusMessage()}
    </div>
  )
}

export default Status
