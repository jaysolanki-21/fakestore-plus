import React from 'react'
import Nav from './Components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import AddProduct from './Pages/AddProduct'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ManageProduct from './Pages/ManageProduct'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/manage" element={<ManageProduct />} />
      </Routes>
    </div>
  )
}

export default App
