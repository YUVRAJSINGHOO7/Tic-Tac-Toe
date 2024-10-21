import { useState } from "react"
export default function Player({initialName,symbol,isActive ,onChaneName}){
    const[ playerName , setPlayerName ]=useState(initialName);
    const[ isEditing , setIsEditing ]=useState(false);

    function handleEditClick() {
        //          ****************************if your new state depends on your old state**********************************
        //setIsEditing(!isEditing)              It's not recommended by react team/develpers , instead pass a arrow function / normal function 
        //                                      just simply memorise it
        setIsEditing((editing) => !editing)
        if (isEditing) {
            onChaneName(symbol , playerName);
        }
    }

    function handlaChange(event) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>

    if (isEditing){
        editablePlayerName = <input type="text" value={playerName} onChange={handlaChange}required/>
    }
    return(
        <li className={isActive ? 'active': undefined}> 
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save":"Edit"}</button>
        </li>
    )
}