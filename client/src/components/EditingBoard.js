import { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tile from './Tile';

export default function EditingBoard() {
  const [pieceType, setPieceType] = useState({})
  const [selectedOffset, setSelectedOffset] = useState(null)
  const [moves, setMoves] = useState([])
    
  const pieceTypeId = useParams().id
  useEffect(() => {
    fetch(`/piece_types/${pieceTypeId}`)
    .then(res => res.json())
    .then(piece => {
      setPieceType(piece)
      setMoves(piece.moves)
    });

    // fetch(`http://localhost:3000/piece_types/${pieceTypeId}/moves`)
    // .then(res => res.json())
    // .then(setMoves);
  }, [])

  const postNewMove = newMove => {
    fetch(`/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMove)
    })
    .then(res => res.json())
    .then(postedMove => {
      newMove.id = postedMove.id;
    })
  }

  const createMove = (offset, dependentOffset=null) => {
    const newMove = {
      piece_type_id: pieceTypeId,
      can_kill: true,
      dependent_on: dependentOffset,
      offset: offset
    }

    setMoves([...moves, newMove])
    postNewMove(newMove)
  }

  const tileClickFn = offset => {
    if(offset === selectedOffset) {
      setSelectedOffset(null)
      return null
    }
    if(offset !== '0,0') {
      if(moves.some(move => move.offset == offset)) {
        setSelectedOffset(offset)
      } else {
        createMove(offset, selectedOffset)
        setSelectedOffset(null)
      }
    }
  }
  
  const nav = useNavigate();
  const boardSize = 13
  return (
    <div id="editingBoard" >
      <button id="moveButton" onClick={() => nav(`/games/${pieceType.game_id}`)}>Finished</button>
      <div id="editingGrid">
        {[...Array(boardSize ** 2).keys()].map(i => {
          const offset = `${(i % boardSize + 1) - 7},${(13 - Math.floor(i / boardSize)) - 7}`;
          const displayPieceType = offset === '0,0' ? pieceType : null; 
          const moveable = moves.some(move => move.offset === offset);   
          return (
            <Tile 
              moveable={moveable}
              key={offset} 
              offset={offset}
              selectedOffset={selectedOffset}
              piece={displayPieceType} 
              tileClickFn={tileClickFn}
            />
          )
        })}
      </div>
    </div>
  )
}
