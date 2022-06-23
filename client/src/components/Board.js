import React from 'react'
import Tile from './Tile'

export default function Board({ pieceClickFn, tileClickFn, getPieceAtCoords, selectedPossibleMoves, pieceSelectedCoords }) {
  const boardSize = 7;
  return (
    <div id="board" >
      <div id="gameGrid">
        {[...Array(boardSize ** 2).keys()].map(i => {
          const coords = `${i % boardSize + 1},${7 - Math.floor(i / boardSize)}`;
          const moveable = selectedPossibleMoves?.includes(coords)
          const piece = getPieceAtCoords(coords)
          
          return (
            <Tile 
              key={coords} 
              piece={piece} 
              coords={coords} 
              moveable={moveable}
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
