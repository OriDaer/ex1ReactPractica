import React, { useState, useEffect } from 'react';
import './Tesoro2.css';

function Tesoro2() {
    // Inicializar el tablero como un array unidimensional de 25 elementos (todos null)
    const [board, setBoard] = useState([
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null
    ]);

    const [tesoroLocation, settesoroLocation] = useState(0); // Usar solo un valor numérico para la ubicación
    const [gameOver, setGameOver] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        handleRandomLocation();
    }, []);

    const handleRandomLocation = () => {
        let x = Math.floor(Math.random() * 25); // Ubicar el tesoro entre la posicion 0 a la 24 
        settesoroLocation(x);
        console.log("Tesoro generado en la celda:", x);
    };

    const handleReset = () => {
        setBoard([   // Reiniciar el tablero
            null, null, null, null, null,
            null, null, null, null, null,
            null, null, null, null, null,
            null, null, null, null, null,
            null, null, null, null, null
        ]);
        setGameOver(false);
        setClickCount(0);
        handleRandomLocation();  // Generar nueva ubicación para el tesoro
    };

    const handleCeldaClick = (index) => {
        if (gameOver==true || board[index] !== null) {
            return;
        } // No hacer nada si el juego terminó o la celda ya fue clickeada
        const updatedBoard = [...board]; // Clonar el tablero actual
        if (index === tesoroLocation) {
            updatedBoard[index] = 'T'; // Marcar el tesoro
            setGameOver(true); // Terminar el juego
        } else {
            updatedBoard[index] = 'x'; // Marcar un fallo
            setClickCount(prevCount => prevCount + 1); // Incrementar contador de clics
        }
        setBoard(updatedBoard); // Actualizar el estado del tablero
    };

    return (
        <>
            <div className="game-title">¡Encuentra el Tesoro!</div>
            <div className="board">
                {gameOver && <p className="gameOver">¡Juego terminado!</p>}
                <p>Cantidad de intentos: {clickCount}</p>
                <div className="fila">
                    {board.map((celda, index) => (
                        <div
                            key={index}
                            className={`celda ${celda === 'T' ? 'tesoro' : celda === 'x' ? 'fallo' : 'oculto'}`}
                            onClick={() => handleCeldaClick(index)}
                        >
                            {celda}
                        </div>
                    ))}
                </div>
            </div>
            <button className="reset-button" onClick={handleReset}>Reiniciar</button>
        </>
    );
}

export default Tesoro2;
