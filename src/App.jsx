import { CartProvider } from './context/CartContext.jsx';
import './App.scss'
import { AppRouter } from './router/AppRouter.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { WishProvider } from './context/WishContext.jsx';

function App() {
  
  return (
    <UserProvider>

      <CartProvider>

        <WishProvider>

          <AppRouter />

        </WishProvider>

      </CartProvider>
      
    </UserProvider>
  )
}

export default App