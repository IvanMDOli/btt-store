import { NavBar } from './components/NavBar/NavBar.jsx'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer.jsx';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { useState } from 'react';
import { Footer } from './components/Footer/Footer.jsx'
import './App.scss'

function App() {

  const [itemDetails, setItemDetails] = useState (false)


  return (
    <>
    <NavBar />
    <main className='main'>
      {itemDetails
        ? <ItemDetailContainer />
        : <ItemListContainer greeting={"Productos"} />}
    </main>
    <Footer />
    </>
  )
}

export default App