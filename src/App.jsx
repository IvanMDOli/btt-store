import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer.jsx';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { CartDetails } from './components/CartDetails/CartDetails'
import { PokeApi } from './components/PokeApi/PokeApi.jsx';
import { Footer } from './components/Footer/Footer.jsx'
import { NotFound } from './components/NotFound/NotFound.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './App.scss'
import { Checkout } from './components/Checkout/Checkout.jsx';

function App() {
  
  return (
    <CartProvider>

      <BrowserRouter>

        <NavBar />

        <main className='main'>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/products/:categoryId" element={<ItemListContainer />} />
            <Route path="/itemdetail/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pokeapi" element={<PokeApi />} />
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="*" element={<Navigate to={"/not-found"} />} />
          </Routes>
        </main>

        <Footer />

      </BrowserRouter>

    </CartProvider>
  )
}

export default App