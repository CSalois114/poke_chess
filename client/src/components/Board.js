import React from 'react'
import Tile from './Tile'

export default function Board({ pieceClickFn, tileClickFn, getPieceAtCoords, selectedPossibleMoves, pieceSelectedCoords }) {
  const boardSize = 7;
  return (
    <div id="board" >
      <div id="gameGrid">
        {[...Array(boardSize ** 2).keys()].map(i => {
          const coords = `${i % boardSize + 1},${7 - Math.floor(i / boardSize)}`;
          const move = selectedPossibleMoves[coords]
          const piece = getPieceAtCoords(coords)
          
          return (
            <Tile 
              key={coords} 
              piece={piece} 
              coords={coords} 
              move={move}
              pieceClickFn={pieceClickFn}
              tileClickFn={tileClickFn}
              pieceSelectedCoords={pieceSelectedCoords}
            />
          )
        })}
      </div>
    </div>
  )
}
