import { createContext, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const clearCart = () => {
        setCart([])
    }
  
      const itemsInCart = () => {
        return cart.reduce((acc, item) => acc + item.count, 0)
    }
  
      const totalCart = () => {
        return cart.reduce((acc, item) => acc + (item.count * item.price), 0)
    }
  
      const removeItem = (id) => {
        setCart( cart.filter(item => item.id !== id) )
    }

    console.log(cart)


    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            itemsInCart,
            totalCart,
            removeItem
        }}>
            {children}
        </CartContext.Provider>
    )
}