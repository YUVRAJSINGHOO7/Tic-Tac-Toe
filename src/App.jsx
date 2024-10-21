import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combination.js"
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function deriveWinner(gameBoard,players) {
  let winner ;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    } 
  }
  return winner;
}

function App() {
  const [players , setPlayers] = useState({X :'Player 1' , O : 'Player 2'})
  const [gameTurns , setGameTurns]=useState([]);
  //const [activePlayer , setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns)

  //let gameBoard = initialGameBoard;    ****** important point => even if we are storing initialGameBoard in gameBoard (a different variable) , we are still editing the same original object or array in the memory
  let gameBoard = [...initialGameBoard.map(array => [...array])]; // creating a deep copy of initialGameBoard
    // ********* Now we are going to override the gameBoard by the values received from *********turns********* by using for loop     *********
    // ************ we don't need to manage any state here , instead we are doing something called [[deriving-state ]] *************
    // gameBoard is a computed value that is derived from state (i.e = gameTurns)
    for (const turn of gameTurns) {
      const { square , player} = turn ; // object de-structuring
      const {row , col} = square ; // object de-structuring
      gameBoard[row][col] = player;
    }
  

  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner ; // new thing = we can calculate the length of a state by using .length() 

  function handleSelectSquare(rowIndex , colIndex) {
    
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X') ;   // again the new state depends on the old state , we are using arrow function
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: {row : rowIndex , col : colIndex}, player : currentPlayer }, ...prevTurns];  // updatedTurns will be an array of objects , where square and player are the proprties we have set
      //   ******* now square have a nested object with **** row and col as the properties***** 
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlaPlayerNameChange(symbol , newName) {
    setPlayers(prevPlayers => {
      return {...prevPlayers, [symbol] : newName} 
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChaneName={handlaPlayerNameChange}/>
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChaneName={handlaPlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
