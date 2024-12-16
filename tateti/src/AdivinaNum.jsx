
// adivinar un num entre 0 a 100 y te cuente la cantidad de intentos y t diga si ganaste o si le erraste si es menor o mayor a ese num
//parseInt pasa de cadena a un numero entero
import React, { useState, useEffect } from 'react';

function AdivinaNum() {
    const [intentos, setIntentos] = useState(0);
    const [ganaste, setGanaste] = useState(false);
    const [numero, setNumero] = useState('');
    const [numeroAleatorio, setNumeroAleatorio] = useState();
    const [mensaje, setMensaje] = useState(''); // Nuevo estado para el mensaje

    // Generar un número aleatorio entre 0 y 100
    const generarNumeroAleatorio = () => {
        setNumeroAleatorio(Math.floor(Math.random() * 101));
    };

    // Ejecutar al cargar el componente
    useEffect(() => {
        generarNumeroAleatorio();
    }, []);

    // Actualizar el número ingresado por el usuario
    const handleNumeroUsuario = (e) => {
        setNumero(e.target.value);
    };

    // Comparar el número ingresado con el número aleatorio
    const handleAdivinar = () => {
        const numeroUsuario = parseInt(numero); // Convertir la entrada a número

        if (ganaste) {
            setMensaje('Ya ganaste. Presiona "Reiniciar" para jugar otra vez.');
            return;
        }
        if (numeroUsuario>100|| numeroUsuario<0){
            setMensaje('El número ingresado esta fuera del rango establecido. Intenta de nuevo.');
            return;
        }
        if (isNaN(numeroUsuario)) {
            setMensaje('Por favor, ingresa un número válido.');
            return;
        }

        if (numeroUsuario === numeroAleatorio) {
            setMensaje('¡Ganaste! 🎉');
            setGanaste(true);
        } else if (numeroUsuario < numeroAleatorio) {
            setMensaje('El número es mayor.');
            setIntentos(intentos + 1);
        } else {
            setMensaje('El número es menor.');
            setIntentos(intentos + 1);
        }
    };

    // Reiniciar el juego
    const handleReiniciar = () => {
        setIntentos(0);
        setGanaste(false);
        setNumero('');
        setMensaje('');
        generarNumeroAleatorio();
    };

    return (
        <>
            <h1>Adivina el Número</h1>
            <p>Ingresa un número entre 0 y 100:</p>
            <label>
                <input
                    type='text'
                    value={numero}
                    onChange={handleNumeroUsuario}
                />
            </label>
            <button onClick={handleAdivinar}>Comparar</button>
            {mensaje && <p>{mensaje}</p>} {/* Mostrar el mensaje */}
            <p>Intentos: {intentos}</p>
            <button onClick={handleReiniciar}>Reiniciar</button>
        </>
    );
}

export default AdivinaNum;
