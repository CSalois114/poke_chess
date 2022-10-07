import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Editor from './Editor';
import Board from './Board';

export default function Game() {
  const [gameObj, setGameObj] = useState({});
  const [pieceSelected, setPieceSelected] = useState(null);
  const [typeSelected, setTypeSelected] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isUsersTurn, setIsUsersTurn] = useState(true);

  const gameId = useParams().id
  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}`)
    .then(res => res.json())
    .then(setGameObj);
  },[])

  const getPieceAtCoords = coords => {
    return gameObj.pieces?.find(piece => piece.coords === coords)
  }

  const updateGameObj = updatedGameObj => {
    setGameObj({...updatedGameObj})
  }

  const getCoordsFromOffset = (startCoords, offset) => {
    const coordsArr = startCoords.split(',').map(n => parseInt(n, 10))
    const offsetArr =      offset.split(',').map(n => parseInt(n, 10))
    return [coordsArr[0] + offsetArr[0], coordsArr[1] + offsetArr[1]].join()
  }

  const invertOffset = offset => offset.split(',').map(n => n * -1).join()
  
  const allDependenciesClear = (piece, move) => {
    if (move.dependent_on) {
      const offset = piece.home_team ? move.dependent_on : invertOffset(move.dependent_on)
      const dependencyCoords = getCoordsFromOffset(piece.coords, offset)
      if (getPieceAtCoords(dependencyCoords)) {
        return false;
      }
      const dependentMove = piece.moves.find(newMove => newMove.offset === move.dependent_on)
      return allDependenciesClear(piece, dependentMove)
    }
    return true
  }

  const getPossibleMoves = (piece) => {
    return piece && piece.moves.map(move => {
      const offset = piece.home_team ? move.offset : invertOffset(move.offset)
      const coords = getCoordsFromOffset(piece.coords, offset)
      const isDiffTeam = getPieceAtCoords(coords)?.home_team !== piece.home_team
      const isDependenciesClear = (allDependenciesClear(piece, move));
      const isInBounds = coords.split(',').every(n => n > 0 && n < 8)

      return isDiffTeam && isInBounds && isDependenciesClear ? coords : null;
    }).filter(move => move !== null);
  }
  const selectedPossibleMoves = getPossibleMoves(pieceSelected)
  const mirrorCoords = coords => coords.split(',').map(n => 8-n).join()

  const deletePiece = piece => {
    piece && fetch(`http://localhost:3000/pieces/${piece.id}`, {
      method: 'DELETE'
    })
  }
  
  const postPiece = piece => {
    fetch(`http://localhost:3000/pieces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(piece)
    })
    .then(res => res.json())
    .then(postedPiece => piece.id = postedPiece.id);
  }
  
  const patchPiece = (piece, patch) => {
    fetch(`http://localhost:3000/pieces/${piece.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
  }
  
  const changePieceSelected = piece => {
    if(isUsersTurn){
      if(pieceSelected === piece) {
        setPieceSelected(null)
      } else {
        setPieceSelected(piece)
      }
    }
  }
  
  const changeTypeSelected = pieceType => {
    setIsDeleteMode(false)
    if(typeSelected && pieceType.id === typeSelected.id) {
      setTypeSelected(null)
    } else {
      setTypeSelected(pieceType)
    }
  }
  
  const resetGame = () => {
    gameObj.pieces.forEach(piece => {
      piece.coords = piece.starting_coords;
      patchPiece(piece, {coords: piece.starting_coords})
    })
    setGameObj({...gameObj})
    setIsUsersTurn(true);

  }

  const movePieceSelectedToCoords = (newCoords, piece=pieceSelected) => {
    if(getPossibleMoves(piece)?.includes(newCoords) && piece.home_team === isUsersTurn){
      const killedPiece = getPieceAtCoords(newCoords);
      piece.coords = newCoords;
      patchPiece(piece, {coords: newCoords});
      setPieceSelected(null);
      if(killedPiece) {
        killedPiece.coords = null;
        patchPiece(killedPiece, {coords: null});
        
      }
      if(killedPiece?.is_king) {
        alert(piece.home_team ? "You Win" : "Enemy Wins");
        resetGame();
        return null;
      } else {
        setIsUsersTurn(!isUsersTurn);
      }
    }
  }

  const shuffleArr = arr =>  {
    let currentIndex = arr.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }
  
  const aiMove = () => {
    const aiPieces = gameObj.pieces.filter(piece => !piece.home_team && piece.coords)
    const shuffledPieces = shuffleArr(aiPieces)
    while (shuffledPieces.length > 0) {
      const aiPiece = shuffledPieces.pop()
      const possibleMove= shuffleArr(getPossibleMoves(aiPiece))[0]
      if(possibleMove){
        setTimeout(() => {
          movePieceSelectedToCoords(possibleMove, aiPiece)
        }, 1000);
        return null
      }
    }
    alert("Enemy has no moves.")
  }
  
  !isUsersTurn && aiMove()

  const createPieceAtCoords = coords => {
    if(!getPieceAtCoords(coords)?.is_king && coords.split(',')[1] < 4){
   
      deletePiece(getPieceAtCoords(coords))
      deletePiece(getPieceAtCoords(mirrorCoords(coords)))

      const filtered = gameObj.pieces.filter(piece => (
       ![coords, mirrorCoords(coords)].includes(piece.coords))
      )

      const newPiece = {
        piece_type_id: typeSelected.id,
        starting_coords: coords,
        coords: coords,
        home_team: true,
        image: typeSelected.back_img,
      }

      const mirrorPiece = {
        piece_type_id: typeSelected.id,
        starting_coords: mirrorCoords(coords),
        coords: mirrorCoords(coords),
        home_team: false,
        image: typeSelected.front_img,
      }

      postPiece(newPiece)
      postPiece(mirrorPiece)

      newPiece.moves = typeSelected.moves
      mirrorPiece.moves = typeSelected.moves

      filtered.push(newPiece, mirrorPiece)
      setGameObj(gameObj => ({...gameObj, pieces: filtered}))
      setPieceSelected(newPiece)
    } 
  }

  const deletePair = piece => {
    if(!piece.is_king){
      const mirrorPiece = getPieceAtCoords(mirrorCoords(piece.coords));
      deletePiece(piece)
      deletePiece(mirrorPiece)

      const filtered = gameObj.pieces.filter(p=> (
        ![piece, mirrorPiece].includes(p))
      )
      setGameObj(gameObj => ({...gameObj, pieces: filtered}))
    } 
  }

  const getPieceClickFn = () => {
    if(gameObj.editing_mode && isDeleteMode) {
      return deletePair
    } else {
      return changePieceSelected
    }
  }
  
  const getTileClickFn = () => {
    if(gameObj.editing_mode){
      if(typeSelected) {
        return createPieceAtCoords
      } else {
        return null
      }
    } else {
      return movePieceSelectedToCoords
    }
  }
  const pieceClickFn = getPieceClickFn()
  const tileClickFn = getTileClickFn()
  const toggleDeleteMode = () => {
    setPieceSelected(null)
    setTypeSelected(null)
    setIsDeleteMode(isDeleteMode => !isDeleteMode)
  }
  const boardSize = 7;
  return (
    <div>
      <Board
        pieceClickFn={pieceClickFn} 
        tileClickFn={tileClickFn} 
        getPieceAtCoords={getPieceAtCoords} 
        selectedPossibleMoves={selectedPossibleMoves} 
        pieceSelectedCoords={pieceSelected?.coords}
      />
      {gameObj.editing_mode ? (
        <Editor 
          gameObj={gameObj}
          updateGameObj={updateGameObj} 
          changeTypeSelected={changeTypeSelected}
          typeSelected={typeSelected}
          toggleDeleteMode={toggleDeleteMode}
          isDeleteMode={isDeleteMode}
        /> 
      ): null }
      <button id="resetButton" className='button' onClick={() => resetGame()}> Reset Game</button>
    </div>
  );
}
