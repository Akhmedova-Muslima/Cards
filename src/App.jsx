import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Contacts from './pages/Contacts'
import About from './pages/About'
import News from './pages/News'
import NotFound from './pages/NotFound'
import ProductItem from './pages/ProductItem'


export default function App() {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/news' Component={News}></Route>
        <Route path='/categories' Component={Categories}></Route>
        <Route path='/contacts' Component={Contacts}></Route>
        <Route path='/about' Component={About}></Route>
        <Route path='/:id' Component={ProductItem}></Route>

        <Route path='*' element={<NotFound />} />

      </Routes>

    </>
  )
}
