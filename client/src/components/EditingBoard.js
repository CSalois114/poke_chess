import { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tile from './Tile';

export default function EditingBoard() {
  const [pieceType, setPieceType] = useState({})
  const [selectedOffset, setSelectedOffset] = useState(null)
  const [moves, setMoves] = useState([])
    
  const pieceTypeId = useParams().id
  useEffect(() => {
    fetch(`http://localhost:3000/piece_types/${pieceTypeId}`)
    .then(res => res.json())
    .then(piece => {
      setPieceType(piece)
      setMoves(piece.moves)
    });
  }, [])

  const postNewMove = newMove => {
    fetch(`http://localhost:3000/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMove)
    })
    .then(res => res.json())
    .then(postedMove => {
      newMove.id = postedMove.id;
    })
  }

  const createMove = (offset, dependentOffset) => {
    const dependent = moves.find(m => m.offset == dependentOffset)

    const newMove = {
      piece_type_id: pieceTypeId,
      can_kill: true,
      dependent_on_move_id: dependent?.id,
      dependent_on: dependentOffset,
      offset: offset
    }
    setMoves([...moves, newMove])
    postNewMove(newMove)
  }

  const deleteMove = move => {
    const idFilter = []
    const recDelete = move => {
      idFilter.push(move.id)
      moves.forEach(m => {
        if(m.dependent_on === move.offset){
          recDelete(m)
        }
      })
    }
    fetch(`http://localhost:3000/moves/${move.id}`, {
      method: 'DELETE'
    }).then(res => {
      if(res.ok){
        recDelete(move)
        setMoves(moves.filter(m => !idFilter.includes(m.id)))
      }
    })
  }

  const patchMove = (move, patch) => {
    Object.assign(move, patch)
    setMoves([...moves, move])

    fetch(`http://localhost:3000/moves/${move.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    })
    .then(res => res.json())
    .then(bool => bool || deleteMove(move));
  }

  const tileClickFn = offset => {
    const move = moves.find(m => m.offset == offset)
    
    if(offset !== '0,0') {
      if(move) {
        if (move.must_kill) {
          deleteMove(move)
          setSelectedOffset(null)

        } else if(!move.can_kill && selectedOffset === offset) {
          patchMove(move, {
            must_kill: true, 
            can_kill: true
          })
          setSelectedOffset(null)

        } else if(selectedOffset !== offset ) {
          setSelectedOffset(offset)

        } else {
          patchMove(move, {
            can_kill: false
          })
          setSelectedOffset(null)
        }
      } else {
        console.log(offset, selectedOffset)
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
          const move = moves.find(move => move.offset === offset)
          return (
            <Tile 
              move={move}
              key={offset} 
              offset={offset}
              selectedOffset={selectedOffset}
              piece={displayPieceType} 
              tileClickFn={tileClickFn}
              colorTag="editing"
            />
          )
        })}
      </div>
    </div>
  )
}
