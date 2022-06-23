import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function GameList() {
  const [allGames, setAllGames] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/games`)
    .then(res => res.json())
    .then(setAllGames);
  },[])
  
  const navigate = useNavigate();
  return (
    <div>
      <h2 className='listHeader'>Saved Games</h2>
      <ul id="gameList">
        {allGames.map((game, i) => <li key={i} onClick={() => navigate(`/games/${game.id}`)}>{game.name}</li>)}
      </ul>
    </div>
  )
}
