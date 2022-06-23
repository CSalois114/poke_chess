import { Routes, Route, useNavigate } from "react-router-dom"
import Game from './Game'
import GameList from './GameList'
import CreatePieceType from './CreatePieceType'
import EditingBoard from './EditingBoard'
import Home from "./Home"

export default function App() {
  const navigate = useNavigate();
  return (
    <div id="appBody">
      <button id="homeButton" onClick={() => navigate(`/`)}> Home </button>
      <Routes>
        <Route path="/"                      element={ <Home />            } />
        <Route path="/games"                 element={ <GameList />        } />
        <Route path="/games/:id"             element={ <Game />            } />
        <Route path="/games/:id/piece_types" element={ <CreatePieceType /> } />
        <Route path="/piece_types/:id/moves" element={ <EditingBoard />    } />
      </Routes>
    </div>
  )
}
