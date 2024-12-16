import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tateti from './Tateti.jsx'
import Tesoro from './Tesoro.jsx'
import Memoria from './Memoria.jsx'
import AdivinaNum from './AdivinaNum.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdivinaNum/>
  </StrictMode>,
)
