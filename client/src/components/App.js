import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Game from './Game'
import GameList from './GameList'
import CreatePieceType from './CreatePieceType'
import EditingBoard from './EditingBoard'
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"

export default function App() {
  const [isHasAccount, setIsHasAccount] = useState(true)
  const [currentUser, setCurrentUser] = useState('')
  const navigate = useNavigate();
  const toggleIsHasAccount = () => setIsHasAccount(!isHasAccount)
  console.log(currentUser)
  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if(res.ok) {
        res.json().then(u => {
          console.log("authed")
          console.log(u)
          setCurrentUser(u)
        })
      }
    })
  }, [])
  
  if(!currentUser) {
    if(isHasAccount) {
      return (
        <Login
          setCurrentUser={setCurrentUser}
          toggleIsHasAccount={toggleIsHasAccount}
        />
      )
    } else {
      return (
        <Signup 
          setCurrentUser={setCurrentUser} 
          toggleIsHasAccount={toggleIsHasAccount}
        />
      )
    }
  }
  return (
    <div id="appBody">
      <button id="homeButton" onClick={() => navigate(`/`)}> Home </button>
      <Routes>
        <Route path="/" element={ <Home setCurrentUser={setCurrentUser} /> } />
        <Route path="/games"                 element={ <GameList />        } />
        <Route path="/games/:id"             element={ <Game />            } />
        <Route path="/games/:id/piece_types" element={ <CreatePieceType /> } />
        <Route path="/piece_types/:id/moves" element={ <EditingBoard />    } />
      </Routes>
    </div>
  )
}
