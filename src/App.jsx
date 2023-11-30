import { NavBar } from './components/NavBar/NavBar.jsx'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer.jsx';
import { Footer } from './components/Footer/Footer.jsx'
import './App.scss'

function App() {

  let saludo = '¡Bienvenido!'

  return (
    <>
    <NavBar />
    <main className='main'>
      <ItemListContainer greeting={saludo} />
    </main>
    <Footer />
    </>
  )
}

export default App