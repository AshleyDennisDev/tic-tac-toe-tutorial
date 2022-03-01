import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react'


const Square = ({value, onClick}) => {
      return (
        <button className="square" 
        onClick={ onClick}
        >
          {value}
        </button>
      );
    }
   
  const Board = ({squares, onClick}) => (
      <div className='board-row'>
      {squares.map((square, i) =>(
      <Square 
      key={i}
      value={square} 
      onClick={() => onClick(i)}
      />
      ))}
      </div>
  );

  
const Game = () => {
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber]= useState(0);
  const[xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? 'X' : 'O';


  const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        if(winner || squares[i]) return;
        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    const renderMoves = () =>       
      history.map((_step, move) => {
        const desc = move ? 'Go to move #'+ move : 'Go to game start';
        return (
          <ol key={move}>
            <button className='button' onClick= {() => jumpTo(move)}>{desc}</button>
          </ol>
        );
      });
    
      return(
        <>
        <Board  squares= {history[stepNumber]} onClick= {handleClick} />
        <div className='game'>
          {renderMoves()}
        </div>
   <h3>
        { winner
        ?'Winner:' + winner
        :'Next player:' + xO}
          </h3>
          </>
      );
        };
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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
        return squares[a];
      }
    }
    return null;
  }