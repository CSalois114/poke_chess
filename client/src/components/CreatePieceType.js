import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CreatePieceType() {
  const [pieceTypeArr, setPieceTypeArr] = useState([])
  const navigate = useNavigate();

  const gameId = useParams().id
  console.log(pieceTypeArr)
  useEffect(() => {
    for (let i = 1; i <= 150; i++){
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => res.json())
      .then(pokeObj => {
        setPieceTypeArr(arr => [...arr, {
          game_id: gameId,
          name: pokeObj.name,
          front_img: pokeObj.sprites.front_default,
          back_img: pokeObj.sprites.back_default,
        }])
      })
    }
  }, [])

  const handleClick = pieceType => {
    console.log(pieceType)
    fetch(`http://localhost:3000/piece_types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pieceType)
    })
    .then(res => res.json())
    .then(postedPieceType => {
      navigate(`/piece_types/${postedPieceType.id}/moves`)
    })
  }

  return (
    <div id="typeGrid"> 
      {pieceTypeArr.map(pieceType => (
        <img 
          key={pieceType.name}
          className="tile" 
          src={pieceType.front_img} 
          onClick={() => handleClick(pieceType)}
        />
      ))}
    </div>
  )
}
