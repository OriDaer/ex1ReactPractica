//.floor xq quiero q vaya del 0 al 24 y .ceil si qrs q vaya de 1 a 25
//  const nuevoTablero = [...tablero];//afuera xq dendro del if no t lo reconoce, y creo una copia el array xq no t deja modificar directamente desde el original, react no entirnde
// return; //funciona cm un break
//.floor redondea para abajo, Math.ceil redondea para arriba
//  let indexAleatorio = Math.floor(Math.random() * 25); //genera un numero random entre 0 y 24
//  let indexAleatorio = Math.ceil(Math.random() * 25); //genera un numero random entre 1 y 25
import { useState, useEffect } from 'react';
import './Memoria.css';

function Memoria() {
    const [tablero, setTablero] = useState([
        null, null, null, null, null,
        null, null, null, null, null
        ]); // Inicializa un tablero de 10 casillas
    const [casilla,setCasilla] = useState(['O', 'X', 'T', 'M', 'W']); // Las parejas a encontrar
    const [seleccionados, setSeleccionados] = useState([]); // Casillas seleccionadas
    const [encontrados, setEncontrados] = useState([]); // Casillas encontradas

    // Iniciar el juego automáticamente al renderizar
    useEffect(() => {
        iniciarJuego();
    }, []); // El arreglo vacío asegura que solo se ejecute una vez al principio

    const iniciarJuego = () => {
        let nuevoTablero = [...tablero]; // Copia del tablero inicial
        // Reiniciar el tablero a su estado original
        for (let i = 0; i < nuevoTablero.length; i++) { // Nos aseguramos q todas las posic estén en null
            nuevoTablero[i] = null; // Asegurarse de que cada casilla sea null
        }
        // Colocar las parejas en el tablero
        let parejasColocadas = 0; // Contador de parejas colocadas
        let indexCasilla = 0; // Índice para recorrer las parejas

        while (parejasColocadas < casilla.length * 2) { // Mientras no se hayan colocado todas las parejas
            const indexAleatorio = Math.floor(Math.random() * 10); // Genera un índice aleatorio entre 0 y 9
            if (nuevoTablero[indexAleatorio] === null) { // Si la casilla está vacía
                nuevoTablero[indexAleatorio] = casilla[indexCasilla]; // Asigna el valor correspondiente de `casilla`
                parejasColocadas++;
                if (parejasColocadas % 2 === 0) { // Avanzar al siguiente símbolo después de completar un par
                    indexCasilla++;
                }
            }
        }

        setTablero(nuevoTablero); // Actualiza el estado del tablero con las parejas colocadas
        setSeleccionados([]); // Limpia las selecciones
        setEncontrados([]); // Limpia los pares encontrados
    };

    const seleccionarCasilla = (index) => {
        // Solo permitir seleccionar si hay menos de 2 casillas seleccionadas y no ha sido encontrada previamente
        if (seleccionados.length < 2 && !encontrados.includes(index)) {
            const nuevaSeleccion = [...seleccionados, index]; // Agregar la casilla seleccionada
            // Si ya hay 2 casillas seleccionadas, compararlas
            if (nuevaSeleccion.length === 2) {
                const [primera, segunda] = nuevaSeleccion; // Obtener las dos casillas seleccionadas
                if (tablero[primera] === tablero[segunda]) { // Verificar si coinciden
                    setEncontrados([...encontrados, primera, segunda]); // Marcar como encontradas
                    // Verificar si todas las parejas han sido encontradas
                    if ([...encontrados, primera, segunda].length === tablero.length) { // Comparar con la longitud del tablero
                        alert("¡El juego ha terminado! Presione 'Reiniciar' para jugar de nuevo."); // Mensaje de finalización
                    }
                }
                // Mostrar las letras seleccionadas durante un breve momento
                setSeleccionados(nuevaSeleccion);
                // Limpiar la selección después de un breve momento si no coinciden
                if (tablero[primera] !== tablero[segunda]) { // Si no son iguales
                    setTimeout(() => {
                        setSeleccionados([]); // Reiniciar la selección después de comparar
                    }, 1000); // Esperar un segundo antes de limpiar la selección
                } else {
                    setSeleccionados([]); // Si coinciden, limpiar la selección xq si no c arma un lio y no funciona el codigo
                }
            } else {
                setSeleccionados(nuevaSeleccion); // Actualizar estado de seleccionados si seleccionaste 1 casilla 
            }
        }
    };

    return (
        <>
            <h2>Juego de Memoria</h2>
            <div className="contenedor">
                {tablero.map((valor, index) => (
                    <div
                        key={index} // Clave única para cada casilla
                        onClick={() => seleccionarCasilla(index)} // Función al hacer clic
                        className={encontrados.includes(index) ? 'parEncontrado' : ''} // Agregar clase si es un par encontrado
                    >
                        {/* Mostrar el valor solo si la casilla está seleccionada o ha sido encontrada */}
                        {(seleccionados.includes(index) || encontrados.includes(index)) ? valor : ''}
                    </div>
                ))}
            </div>
            <button onClick={iniciarJuego}>Reiniciar</button> {/* Botón para reiniciar el juego */}
        </>
    );
}

export default Memoria;
