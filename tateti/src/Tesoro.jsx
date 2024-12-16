import React from 'react'
import { useState, useEffect } from 'react'
import './Tesoro.css'
// se deben reiniciar tambien los colores
//si lo reinicie y se pone en unacelda q esta pintada, te lo muestra
// debo hacer que no lo deje hacer mas click si ya lo hizo antes:)
function Tesoro() {
  const [board, setBoard] = useState([[null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]])
  const [treasureLocation, setTreasureLocation] = useState({ x: 0, y: 0 })//coordenadas del Tesoro escondido
  const [gameOver, setGameOver] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  //(gameover)Cuandoel juego termine, bloquea el tablero para evitar clics adicionales hastaque se reinicie.
  const [tesoro, setTesoro] = useState('T')

  useEffect(() => {
    handleRandomLocation()
  }, [])

  const handleRandomLocation = () => {
    let x = Math.floor(Math.random() * 5);
    let y = Math.floor(Math.random() * 5);
    setTreasureLocation({ x, y })
    console.log("Tesoro generado en:", { x, y });
  }
  console.log(treasureLocation)

  const handleReset = () => {
    setBoard([[null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]])
    setRevealedCells([[false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]])
    setTreasureLocation({ x: 0, y: 0 })
    setGameOver(false)
    setClickCount(0)
    handleRandomLocation()
  }
  const handleCeldaClick = (x, y) => {
    if (gameOver) return; // Evitar clics si el juego ha terminado

    // Revelar la celda clickeada
    setRevealedCells(prev => {
      const newRevealedCells = [...prev];
      newRevealedCells[x][y] = true; // Revelar la celda clickeada
      return newRevealedCells;
    });

    if (x === treasureLocation.x && y === treasureLocation.y) {
      setGameOver(true);
      console.log("¡Has encontrado el tesoro!");
    } else {
      setClickCount(clickCount + 1);
      console.log("¡Has clickeado una celda vacía!");
    }
  };
  // Estado para celdas reveladas
  const [revealedCells, setRevealedCells] = useState([[false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]]);

  return (
    <>
      <div>Tesoro</div>
      <div className='board'>
        {gameOver === true ? <div className='gameOver'>¡Juego terminado!</div> : null}
        <p>Cantidad de intentos:{clickCount}</p>
        {
          board.map((fila, indexF) => (
            <div key={indexF} className='row'>
              {
                fila.map((celda, indexC) => {
                  const isRevealed = revealedCells[indexF][indexC];
                  return (
                    <div
                      key={indexC}
                      className={`celda ${isRevealed ? (indexF === treasureLocation.x && indexC === treasureLocation.y ? 'treasure' : 'revealed') : 'hidden'}`}
                      onClick={() => handleCeldaClick(indexF, indexC)}
                    >
                      {isRevealed && indexF === treasureLocation.x && indexC === treasureLocation.y ? 'T' : ''}
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </div>
      <button onClick={handleReset}>Reiniciar</button>
    </>


  )
}

export default Tesoro