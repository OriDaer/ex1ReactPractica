//.floor xq quiero q vaya del 0 al 24 y .ceil si qrs q vaya de 1 a 25
//  const nuevoTablero = [...tablero];//afuera xq dendro del if no t lo reconoce, y creo una copia el array xq no t deja modificar directamente desde el original, react no entirnde
// return; //funciona cm un break
//.floor redondea para abajo, Math.ceil redondea para arriba
//  let indexAleatorio = Math.floor(Math.random() * 25); //genera un numero random entre 0 y 24
import { useState, useEffect } from 'react';
import './Memoria.css';

function Memoria() {
    const [tablero, setTablero] = useState([null, null, null, null, null, null, null, null, null, null]); // Inicializa un tablero de 10 casillas
    const [casilla] = useState(['O', 'X', 'T', 'M', 'W']); // Las parejas a encontrar
    const [seleccionados, setSeleccionados] = useState([]); // Casillas seleccionadas
    const [encontrados, setEncontrados] = useState([]); // Casillas parEncontrados

    // Iniciar el juego automáticamente al renderizar
    useEffect(() => {
        iniciarJuego();
    }, []); // El arreglo vacío asegura que solo se ejecute una vez al principio

    const iniciarJuego = () => {
        let nuevoTablero = [...tablero]; // Copia del tablero inicial

        // Reiniciar el tablero a su estado original
        for (let i = 0; i < nuevoTablero.length; i++) {// nos aseguramos que todas las posiciones esten en null
            nuevoTablero[i] = null; // Asegurarse de que cada casilla sea null
        }

        // Colocar las parejas en el tablero
        let parejasColocadas = 0;
        let indexCasilla = 0;

        while (parejasColocadas < casilla.length * 2) {
            const indexAleatorio = Math.floor(Math.random() * 10); // Asegurarse de que el índice esté entre 0 y 9
            if (nuevoTablero[indexAleatorio] === null) {
                nuevoTablero[indexAleatorio] = casilla[indexCasilla];
                parejasColocadas++;
                if (parejasColocadas % 2 === 0) {
                    indexCasilla++; // Avanza al siguiente símbolo después de colocar un par
                }
            }
        }

        setTablero(nuevoTablero);
        setSeleccionados([]);
        setEncontrados([]);
    };

    const seleccionarCasilla = (index) => {
        // Solo permitir seleccionar si hay menos de 2 casillas seleccionadas y no ha sido parEncontrado
        if (seleccionados.length < 2 && !encontrados.includes(index)) {
            const nuevaSeleccion = [...seleccionados, index]; // Agregar la casilla seleccionada

            // Si ya hay 2 casillas seleccionadas, compararlas
            if (nuevaSeleccion.length === 2) {
                const [primera, segunda] = nuevaSeleccion;

                if (tablero[primera] === tablero[segunda]) {
                    setEncontrados([...encontrados, primera, segunda]); // Marcar como parEncontrados

                    // Verificar si todas las parejas han sido parEncontrados
                    if (encontrados.length === tablero.length) {
                        alert("¡El juego ha terminado! Presione 'Reiniciar' para jugar de nuevo."); // Mensaje de finalización
                    }
                }

                // Mostrar las letras seleccionadas durante un breve momento
                setSeleccionados(nuevaSeleccion);

                // Limpiar la selección después de un breve momento si no coinciden
                if (tablero[primera] !== tablero[segunda]) {
                    setTimeout(() => {
                        setSeleccionados([]); // Reiniciar la selección después de comparar
                    }, 1000); // Esperar un segundo antes de limpiar la selección
                } else {
                    setSeleccionados([]); // Si coinciden, no limpiar la selección
                }
            } else {
                setSeleccionados(nuevaSeleccion); // Actualizar estado de seleccionados
            }
        }
    };

    return (
        <>
            <h2>Juego de Memoria</h2>
            <div className="contenedor">
                {tablero.map((valor, index) => (
                    <div
                        key={index}
                        onClick={() => seleccionarCasilla(index)}
                        className={encontrados.includes(index) ? 'parEncontrado' : ''}
                    >
                        {(seleccionados.includes(index) || encontrados.includes(index)) ? valor : ''}
                    </div>
                ))}
            </div>
            <button onClick={iniciarJuego}>Reiniciar</button>
        </>
    );
}

export default Memoria;
