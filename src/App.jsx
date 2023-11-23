import { useState } from 'react';
import { NavBar } from './components/NavBar.jsx'
import { ItemCount } from './components/ItemCount.jsx'
import './styles/App.css'

function App() {

  const [carrito, setCarrito] = useState([]);

  return (
    <>
    <NavBar />
    <ItemCount carrito={carrito} setCarrito={setCarrito} />
    <ul>
      {carrito.map((item, index) => (
                      <li key={index}>{item.cantidad}</li>
      ))}
    </ul>
    </>
  )
}

export default App
