import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function Editor({
  gameObj,
  changeTypeSelected,
  typeSelected,
  toggleDeleteMode,
  isDeleteMode,
  updateGameObj
}) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const updateName = (e) => {
    setName(e.target.value);
  };

  const patchGame = patch => {
    fetch(`http://localhost:3000/games/${gameObj.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    })
    .then(res => res.json())
    .then(bool => bool && updateGameObj({...gameObj, ...patch}));
  }

  const saveBoard = () => {
    console.log("test")
    if(name){
      patchGame({editing_mode: false, name: name})
    } else {
      alert("Please enter a name for this game.")
    }
  }

  return (
    <div id="editor">
      <form>
        <input onChange={updateName} value={name} placeholder="Enter Name"/>
      </form>
      <button 
        id="deletePokeButton" 
        className={"editButton " + (isDeleteMode ? "active" : null )}
        onClick={toggleDeleteMode}
      >
        Delete Pieces
      </button>
      <button 
        id="newPokeButton" 
        className="editButton"
        onClick={() => navigate(`/games/${gameObj.id}/piece_types`)}
      >
        New PokéMon
      </button>
      <button 
        id="saveButton" 
        className="editButton"
        onClick={() => saveBoard()}
      >
        Save Setup
      </button>
      <div>
        <div id="rosterGrid">
          {gameObj.piece_types.map((piece) => {
            return (
              <img
                key={piece.id}
                className={
                  (typeSelected === piece ? "typeSelected" : null) + " poke"
                }
                src={piece.front_img}
                onClick={() => changeTypeSelected(piece)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
