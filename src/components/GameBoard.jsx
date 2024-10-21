export default function GameBoard({ onSelectSquare , board }){

    //const [gameBoard , setGameBoard] = useState(initialGameBoard);

    // *********************when working with objects and arrays , we should not mutate/change them directly/original , instead create a copy of original array/objects using "spread" operator*********************
    // *********************we should not be doing the following :- *********************
    
    
    // function handleSelectSquare(rowIndex , colIndex ) {
    //     setGameBoard((prevGameBoard) => {prevGameBoard[rowIndex][colIndex] = ' X ' });
    //     return prevGameBoard
    // }

    // function handleSelectSquare(rowIndex , colIndex ) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];   // here we got brand new array with brand new nested array
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol ;
    //         return updatedBoard
    //     });
    //     onSelectSquare();
    // }

    return(
        <ol id="game-board">
            {board.map((row , rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol , colIndex) => 
                        <li key={colIndex}> 
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)}  disabled={playerSymbol !== null}>
                                {playerSymbol}
                            </button> 
                        </li>)}
                </ol>
            </li>)}
        </ol>
    )
}