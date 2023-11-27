import { NavBar } from './components/NavBar/NavBar.jsx'
import { ItemContainer } from './components/ItemContainer/ItemContainer.jsx';
import { Footer } from './components/Footer/Footer.jsx'
import './App.scss'

function App() {

  return (
    <>
    <NavBar />
    <main className='main'>
      <ItemContainer />
      <Footer />
    </main>
    </>
  )
}

export default App
