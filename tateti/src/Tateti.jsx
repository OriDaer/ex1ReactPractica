import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Tateti.css'

function Tateti() {
  const [ficha,setFicha]= useState('O')
  const[tablero,setTablero]=useState([null,null,null,null,null,null,null,null,null])
  const [turno, setTurno] = useState([])

  const handlePos = (pos) => {
    console.log("dwaoidawj")
    if (tablero[pos] === null) {
      setTablero({...tablero,[pos]:ficha})

    }
  }
  console.log(tablero)


  return (
    <>
    <h2>hola existo</h2>
      <div className='contenedor'>
        <div onClick={() => handlePos(0)}>h</div>
        <div onClick={() => handlePos(1)}>f</div>
        <div onClick={() => handlePos(2)}>p</div>
        <div onClick={() => handlePos(3)}>k</div>
        <div onClick={() => handlePos(4)}>w</div>
        <div onClick={() => handlePos(5)}>u</div>
        <div onClick={() => handlePos(6)}>dr</div>
        <div onClick={() => handlePos(7)}>s</div>
        <div onClick={() => handlePos(8)}>s</div>
      </div>
    </>
  )
}

export default Tateti
