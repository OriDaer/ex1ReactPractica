import { useState } from 'react';
import './Tateti.css';

function Tateti() {
  const [ficha, setFicha] = useState('O');
  const [tablero, setTablero] = useState([null, null, null, null, null, null, null, null, null]);
  const [ganador, setGanador] = useState('');
  const [controlador, setControlador] = useState(false);

  const handleGanador = (tablero) => {
    if (tablero[0] === tablero[1] && tablero[1] === tablero[2] && tablero[2] !== null) {
      setGanador(tablero[0]);
      setControlador(true);    // Detener el juego
      return;
    }
    if (tablero[3] === tablero[4] && tablero[4] === tablero[5] && tablero[5] !== null) {
      setGanador(tablero[3]);
      setControlador(true);
      return;
    }
    if (tablero[6] === tablero[7] && tablero[7] === tablero[8] && tablero[8] !== null) {
      setGanador(tablero[6]);
      setControlador(true);
      return;
    }
    if (tablero[0] === tablero[3] && tablero[3] === tablero[6] && tablero[6] !== null) {
      setGanador(tablero[0]);
      setControlador(true);
      return;
    }
    if (tablero[1] === tablero[4] && tablero[4] === tablero[7] && tablero[7] !== null) {
      setGanador(tablero[1]);
      setControlador(true);
      return;
    }
    if (tablero[2] === tablero[5] && tablero[5] === tablero[8] && tablero[8] !== null) {
      setGanador(tablero[2]);
      setControlador(true);
      return;
    }
    if (tablero[0] === tablero[4] && tablero[4] === tablero[8] && tablero[8] !== null) {
      setGanador(tablero[0]);
      setControlador(true);
      return;
    }
    if (tablero[2] === tablero[4] && tablero[4] === tablero[6] && tablero[6] !== null) {
      setGanador(tablero[2]);
      setControlador(true);
      return;
    }
  }

  const handlePos = (pos) => {
    if (controlador=== true) {
      return;
    }
    if (tablero[pos] === null) {
      const nuevoTablero = [...tablero];
      nuevoTablero[pos] = ficha;
      setTablero(nuevoTablero);
      handleGanador(nuevoTablero);

      if (!nuevoTablero.includes(null) && !ganador) {
        setGanador('Empate');
        setControlador(true);
      } else {
        setFicha(ficha === 'O' ? 'X' : 'O');
      }
    }
  }
  const handleReiniciar = () => {
    setTablero([null, null, null, null, null, null, null, null
      , null]);
      setGanador('');
      setFicha('O');
      setControlador(false);
      }
  return (
    <>
      <h2>Tateti</h2>
      {ganador === 'Empate' && ganador ? <h3>Resultado: {ganador} </h3> : ganador && <h3>Ganador: {ganador} </h3>}
      <div className='contenedor'>
        <div onClick={() => handlePos(0)}>{tablero[0]}</div>
        <div onClick={() => handlePos(1)}>{tablero[1]}</div>
        <div onClick={() => handlePos(2)}>{tablero[2]}</div>
        <div onClick={() => handlePos(3)}>{tablero[3]}</div>
        <div onClick={() => handlePos(4)}>{tablero[4]}</div>
        <div onClick={() => handlePos(5)}>{tablero[5]}</div>
        <div onClick={() => handlePos(6)}>{tablero[6]}</div>
        <div onClick={() => handlePos(7)}>{tablero[7]}</div>
        <div onClick={() => handlePos(8)}>{tablero[8]}</div>
      </div>
      <button onClick={handleReiniciar}>Reiniciar</button>
    </>
  );
}

export default Tateti;
