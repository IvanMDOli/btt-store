import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const [cart, setCart] = useState(savedCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    const addToCart = (item) => {
    
        const cartCopy = [...cart]

        const isItemInCart = cartCopy.some(cartItem => {
            if(cartItem.id === item.id) {
                    
                cartItem.count = cartItem.count + item.count;
                setCart(cartCopy)
                return true
            }
            return false;
        });

        if(!isItemInCart) {
            setCart([...cart, item])
        }
    }

    const clearCart = () => {
        cart.map((e) => {
            localStorage.removeItem(`stock_${e.id}`);
        })

        setCart([])
    }
  
      const itemsInCart = () => {
        return cart.reduce((acc, item) => acc + item.count, 0)
    }
  
      const totalCart = () => {
        return cart.reduce((acc, item) => acc + (item.count * item.price), 0)
    }
  
      const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.removeItem(`stock_${id}`);
    }

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