import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());
  const [gameWon, setGameWon] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let row=0; row<nrows; row++) {
      initialBoard[row] = [];
      for (let col=0; col<ncols; col++){
        initialBoard[row][col] = Boolean(Math.random() <= chanceLightStartsOn);
      }
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    if (board.every(row => {
      return row.every(col => col === true);
    }) && gameWon === false) {
      setGameWon(true);
    }
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyOldBoard = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyOldBoard);
      flipCell(y-1, x, copyOldBoard);
      flipCell(y+1, x, copyOldBoard);
      flipCell(y, x-1, copyOldBoard);
      flipCell(y, x+1, copyOldBoard);

      // TODO: return the copy
      return copyOldBoard;
    });
  }



  // if the game is won, just show a winning msg & render nothing else

  // TODO
  hasWon()
  
  if (gameWon) {
    return (
      <div className="Board">
        <h1>You Win!!</h1>
      </div>
    )
  } 
  
  // make table board

  // TODO
  else {
    return (
      <table className="Board">
        <tbody>
          {board.map((row, rowIndex) => {
            return (<tr className="row" key={rowIndex} >
              {row.map((col, colIndex) => {
                return (
                  <Cell 
                    key={`${rowIndex}-${colIndex}`} 
                    isLit={col} 
                    flipCellsAroundMe={() => { flipCellsAround(`${rowIndex}-${colIndex}`) }} />
                )
              })}
            </tr>)
          })}
        </tbody>
      </table>
    )
  }
  
}

export default Board;
