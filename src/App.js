import React, { useState } from 'react'
import './App.css';
import Board from './components/Board';
import Status from './components/Status';
import './components/Styles.css'
//import History from './components/History';

const NEW_GAME=[{squares: Array(9).fill(null) , isXNext: false}]

function App() {
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          winnerSquares: lines[i]
        };
      }
    }
    return {
      winner:null,
      winnerSquares:[]
    };
  }
  const [history,setHistory]=useState(NEW_GAME);
  const[currentMove, setCurrentMove]=useState(0);
  const gamingBoard=history[currentMove];
  const {winner, winnerSquares}=calculateWinner(gamingBoard.squares);
  //const player= isXNext? 'X':'O';
  //const statusMessage =winner? `The Winner is ${winner}`:`Next Player is ${player}`
  const handleSquareClick=(clickedPosition)=>{

    if(gamingBoard.squares[clickedPosition] || winner){
      return;
    }

    setHistory(currentHistory =>{
      const lastGameState=currentHistory[currentHistory.length-1];
      const nextGameState=lastGameState.squares.map((squareValue , position)=>{
        if(clickedPosition === position){
          return lastGameState.isXNext ?'X':'O';
        }
        return squareValue;
      })
      return currentHistory.concat({squares: nextGameState,isXNext: !lastGameState.isXNext})
    })

    setCurrentMove(move => move+1)
  }
  const onNewGameStart=()=>{
    setHistory(NEW_GAME);
    setCurrentMove(0);
  }
  return (
    <div className="App">
      <h1><img className='App-logo' src='ticImg.png' alt=''></img> &nbsp;TIC <span className='text-green'>TAC</span> TOE &nbsp;<img className='App-logo' src='ticImg.png' alt=''></img></h1>
      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} winnerSquares={winnerSquares}/>      
      <Status winner={winner} gamingBoard={gamingBoard}/>
      <button type='button' onClick={onNewGameStart} className={`btn-reset ${winner ?'active' : ''}`}>Start New Game</button>
    </div>
  );
}

export default App;
