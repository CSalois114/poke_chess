import { useNavigate } from 'react-router-dom';

export default function Home({ setCurrentUser }) {
  const navigate = useNavigate();

  const handleNewGameClick = e => {
    e.target.innerText = "...LOADING";
    fetch(`/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }})
    .then(res => res.json())
    .then(newGame => {
      navigate(`/games/${newGame.id}`)
    });
  }

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE"
    })
    setCurrentUser('')
  }

  return (
    <div>
      <h2 className='listHeader'>Poké Chess</h2>
      <ul id="homeList" className="defaultList">
        <li onClick={() => navigate("/games")}>Select Game</li>
        <li onClick={handleNewGameClick}>Create New Game</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  )
}
