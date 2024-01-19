import { createContext, useState, useEffect } from "react";


export const WishContext = createContext();

export const WishProvider = ({ children }) => {

    const savedWishList = JSON.parse(localStorage.getItem("wish-list-items")) || [];

    const [wishItemList, setWishItemList] = useState(savedWishList)

    useEffect(() => {
        localStorage.setItem("wish-list-items", JSON.stringify(wishItemList));
    }, [wishItemList]);

    const addToWishArray = (item) => {

        const wishListFind = wishItemList.find(e => e.id == item.id)

        if(!wishListFind) {
            setWishItemList([...wishItemList, item])
        }
    }

    const removeWishItem = (itemId) => {
        const wishListFilter = wishItemList.filter(item => item.id !== itemId)
        setWishItemList(wishListFilter)
    }

    const clearWishList = () => {
        wishItemList.map((e) => {
            localStorage.removeItem(`wish-list_${e.id}`);
        })
        setWishItemList([])
    }

    return(
        <WishContext.Provider value={{
            wishItemList,
            addToWishArray,
            removeWishItem,
            clearWishList
        }}>
            {children}
        </WishContext.Provider>
    )
}