import React from 'react'
import "./Styles.css"

const Square = (props) => {
  return (
    <button className={`square ${props.value==='X'?'text-orange':'text-green'} ${props.isWinningSquare?'winning':''}`} type='button' onClick={props.onClick} >{props.value}</button>
      
    
  )
}

export default Square
