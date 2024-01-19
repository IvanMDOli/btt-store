import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/NavBar/NavBar'
import { ItemListContainer } from '../components/ItemListContainer/ItemListContainer'
import { Login } from '../components/Login/Login'
import { ItemDetailContainer } from '../components/ItemDetailContainer/ItemDetailContainer'
import { CartDetails } from '../components/CartDetails/CartDetails'
import { Checkout } from '../components/Checkout/Checkout'
import { PokeApi } from '../components/PokeApi/PokeApi'
import { NotFound } from '../components/NotFound/NotFound'
import { AboutMe } from '../components/Footer/AboutMe/AboutMe'
import { Footer } from '../components/Footer/Footer'
import { UserContext } from '../context/UserContext'
import { Profile } from '../components/Profile/Profile'
import { Signup } from '../components/Signup/Signup'
import { Orders } from '../components/Checkout/Orders/Orders'
import { WishList } from '../components/WishList/WishList'

export const AppRouter = () => {

  const { user } = useContext(UserContext)

  return (
    
    <BrowserRouter>

      <NavBar />

      <main className='main'>

        <Routes>

          <Route path="/" element={<ItemListContainer />} />

          <Route path="/profile" element={user.logged ? <Profile /> : (<Navigate to={"/login"} />)}/>
          <Route path="/login" element={user.logged ? (<Navigate to={"/profile"} />) : <Login />}/>
          <Route path="/signup" element={user.logged ? (<Navigate to={"/profile"} />) : <Signup />} />

          <Route path="/products/:categoryId" element={<ItemListContainer />} />
          <Route path="/itemdetail/:itemId" element={<ItemDetailContainer />} />

          <Route path="/cart" element={<CartDetails />} />
          <Route path="/wish-list" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/pokeapi" element={<PokeApi />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="/about-me" element={<AboutMe />} />

          <Route path="*" element={<Navigate to={"/not-found"} />} />

        </Routes>
        
      </main>

      <Footer />

    </BrowserRouter>

  )
}
