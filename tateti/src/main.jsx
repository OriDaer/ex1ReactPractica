import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tateti from './Tateti.jsx'
import Tesoro from './Tesoro.jsx'
import Memoria from './Memoria.jsx'
import AdivinaNum from './AdivinaNum.jsx'
import Tesoro2 from './Tesoro2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tesoro2/>
  </StrictMode>,
)
