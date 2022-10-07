import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function GameList() {
  const [allGames, setAllGames] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/games`)
    .then(res => res.json())
    .then(setAllGames);
  },[])

  const deleteGame = gameId => {
    fetch(`http://localhost:3000/games/${gameId}`, {
      method: 'DELETE'
    }).then(res => {
      if(res.ok){
        setAllGames(allGames.filter(game => game.id !== gameId))
      }
    })

  }
  
  const handleGameSelectClick = gameId => {
    navigate(`/games/${gameId}`)
  }

  const handleDeleteGameClick = (e, gameId) => {
    e.stopPropagation()
    deleteGame(gameId)
  }

  return (
    <div>
      <h2 className='listHeader'>Saved Games</h2>
      <ul id="gameList">
        {allGames.map((game, i) => 
          <li 
            key={i} 
            onClick={() => handleGameSelectClick(game.id)}>{game.name}
            <button 
              className='deleteButton'
              onClick={(e) => handleDeleteGameClick(e, game.id)}
              >X
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
