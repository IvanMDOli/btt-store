import { CartProvider } from './context/CartContext.jsx';
import './App.scss'
import { AppRouter } from './router/AppRouter.jsx';
import { UserProvider } from './context/UserContext.jsx';

function App() {
  
  return (
    <UserProvider>

      <CartProvider>

        <AppRouter />

      </CartProvider>
      
    </UserProvider>
  )
}

export default App