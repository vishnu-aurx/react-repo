import './component-css/Game.css';

import React, { useState } from "react";

type SquareValue = "X" | "O" | null;

const Game: React.FC = () => {
  const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner === "X" ? playerX : playerO);
    }
  };

  const handleStartGame = () => {
    if (playerX && playerO) {
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(false);
  };

  return (
    <div className="game-container">
      {!gameStarted ? (
        <div className="game-setup">
          <h2 className="game-title">Enter Player Names</h2>
          <input
            className="player-input"
            type="text"
            placeholder="Player X Name"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <input
            className="player-input"
            type="text"
            placeholder="Player O Name"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <button className="btn-start" onClick={handleStartGame} disabled={!playerX || !playerO}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-inner">
          <div className="game-board">
            <div className="board-row">
              {squares.slice(0, 3).map((value, index) => (
                <button key={index} className="square" onClick={() => handleClick(index)}>
                  {value}
                </button>
              ))}
            </div>
            <div className="board-row">
              {squares.slice(3, 6).map((value, index) => (
                <button key={index + 3} className="square" onClick={() => handleClick(index + 3)}>
                  {value}
                </button>
              ))}
            </div>
            <div className="board-row">
              {squares.slice(6, 9).map((value, index) => (
                <button key={index + 6} className="square" onClick={() => handleClick(index + 6)}>
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="game-info">
            {!winner && (
              <div >
                <h1 className='pName'>
                {isXNext ? playerX : playerO}
               </h1>
              </div>
            )}
            <button className="btn-restart" onClick={resetGame}>
              Restart Game
            </button>
          </div>
        </div>
      )}

      {winner && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Congratulations</h2>
            <h1 className='pName'>{winner}</h1>

            <button className="btn-restart" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function to calculate the winner
function calculateWinner(squares: Array<SquareValue>): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default Game;
// import React, { useRef, useState } from 'react';

// interface GameProps {}

// const Game: React.FC<GameProps> = () => {
//   const [wordToGuess, setWordToGuess] = useState<string>('apple'); // Example word
//   const [currentGuess, setCurrentGuess] = useState<string>('');
//   const [guesses, setGuesses] = useState<string[]>([]);
//   const [message, setMessage] = useState<string>('');
//   const [isDrawing, setIsDrawing] = useState<boolean>(true); // True if the current player is drawing
//   const [turn, setTurn] = useState<number>(1); // Track the current turn (1 for Player 1, 2 for Player 2)
  
//   const [color, setColor] = useState<string>('#000000');
//   const [lineWidth, setLineWidth] = useState<number>(5);
//   const [isEraser, setIsEraser] = useState<boolean>(false);
//   const [shape, setShape] = useState<string>('free'); // Shape to draw: 'free', 'line', 'rectangle', 'circle'

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const isDrawingRef = useRef<boolean>(false);
//   const startXRef = useRef<number | null>(null);
//   const startYRef = useRef<number | null>(null);

//   const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentGuess(event.target.value);
//   };

//   const handleGuessSubmit = () => {
//     if (currentGuess.trim().toLowerCase() === wordToGuess.toLowerCase()) {
//       setMessage('Correct!');
//       setTurn(turn === 1 ? 2 : 1);
//       setIsDrawing(turn === 2);
//     } else {
//       setMessage('Try again!');
//       setGuesses([...guesses, currentGuess]);
//     }
//     setCurrentGuess('');
//   };

//   const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     isDrawingRef.current = true;
//     const rect = canvas.getBoundingClientRect();
//     startXRef.current = event.clientX - rect.left;
//     startYRef.current = event.clientY - rect.top;

//     if (shape === 'free') {
//       ctx.beginPath();
//       ctx.moveTo(startXRef.current, startYRef.current);
//     }
//   };

//   const endDrawing = () => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     isDrawingRef.current = false;
//     ctx.closePath();
//   };

//   const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current || !isDrawingRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     ctx.lineWidth = lineWidth;
//     ctx.strokeStyle = isEraser ? '#ffffff' : color;
//     ctx.lineCap = 'round';
//     ctx.fillStyle = color;

//     if (shape === 'free') {
//       ctx.lineTo(x, y);
//       ctx.stroke();
//     } else if (shape === 'line') {
//       if (startXRef.current !== null && startYRef.current !== null) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.beginPath();
//         ctx.moveTo(startXRef.current, startYRef.current);
//         ctx.lineTo(x, y);
//         ctx.stroke();
//       }
//     } else if (shape === 'rectangle') {
//       if (startXRef.current !== null && startYRef.current !== null) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.beginPath();
//         ctx.rect(startXRef.current, startYRef.current, x - startXRef.current, y - startYRef.current);
//         ctx.stroke();
//       }
//     } else if (shape === 'circle') {
//       if (startXRef.current !== null && startYRef.current !== null) {
//         const radius = Math.sqrt(Math.pow(x - startXRef.current, 2) + Math.pow(y - startYRef.current, 2));
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.beginPath();
//         ctx.arc(startXRef.current, startYRef.current, radius, 0, Math.PI * 2);
//         ctx.stroke();
//       }
//     }
//   };

//   const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setColor(event.target.value);
//   };

//   const handleLineWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLineWidth(Number(event.target.value));
//   };

//   const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setShape(event.target.value);
//   };

//   const handleEraserToggle = () => {
//     setIsEraser(!isEraser);
//   };

//   const handleClearCanvas = () => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const handleDrawButtonClick = () => {
//     setMessage('Drawing...');
//     setTurn(turn === 1 ? 2 : 1);
//     setIsDrawing(turn === 2);
//   };

//   return (
//     <div className="game__container">
//       <h1>{isDrawing ? `Player ${turn} is drawing` : `Player ${turn} is guessing`}</h1>
//       {isDrawing ? (
//         <div className="game__drawing-area">
//           <canvas
//             ref={canvasRef}
//             width={800}
//             height={600}
//             className="game__canvas"
//             onMouseDown={startDrawing}
//             onMouseUp={endDrawing}
//             onMouseMove={draw}
//           />
//           <div className="game__controls">
//             <label>
//               Color Palette:
//               <select onChange={handleColorChange} value={color} className="game__color-picker">
//                 <option value="#000000">Black</option>
//                 <option value="#ff0000">Red</option>
//                 <option value="#00ff00">Green</option>
//                 <option value="#0000ff">Blue</option>
//                 <option value="#ffff00">Yellow</option>
//               </select>
//             </label>
//             <label>
//               Line Width:
//               <input
//                 type="range"
//                 min="1"
//                 max="20"
//                 value={lineWidth}
//                 onChange={handleLineWidthChange}
//                 className="game__line-width-slider"
//               />
//             </label>
//             <label>
//               Shape:
//               <select onChange={handleShapeChange} value={shape} className="game__shape-picker">
//                 <option value="free">Free Draw</option>
//                 <option value="line">Line</option>
//                 <option value="rectangle">Rectangle</option>
//                 <option value="circle">Circle</option>
//               </select>
//             </label>
//             <button onClick={handleEraserToggle} className="game__eraser-toggle">
//               {isEraser ? 'Switch to Pen' : 'Switch to Eraser'}
//             </button>
//             <button onClick={handleClearCanvas} className="game__clear-button">
//               Clear Canvas
//             </button>
//           </div>
//           <button onClick={handleDrawButtonClick} className="game__draw-button">Finish Drawing</button>
//         </div>
//       ) : (
//         <div>
//           <input
//             type="text"
//             value={currentGuess}
//             onChange={handleGuessChange}
//             placeholder="Enter your guess..."
//             className="game__guess-input"
//           />
//           <button onClick={handleGuessSubmit} className="game__submit-button">Submit Guess</button>
//           <div className="game__guesses-list">
//             <h2>Previous Guesses:</h2>
//             <ul>
//               {guesses.map((guess, index) => (
//                 <li key={index}>{guess}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Game;


