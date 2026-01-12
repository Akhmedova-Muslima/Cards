import React from 'react'
import logo from '../assets/images/logo.png'
import box from '../assets/images/box.svg'
import { Link, NavLink } from 'react-router-dom'


export default function Navbar() {

    const links = [
        { title: 'Главная', url:'/' },
        { title: 'Новинки', url:'/news' },
        { title: 'Категории', url:'/categories' },
        { title: 'Контакты ', url:'/contacts' },
        { title: 'О нас', url:'/about' },
    ]


  return (
    <>

        <nav className="nav">

            <Link to={'/'} className="nav_logo"> <img src={logo} alt="" /> </Link>

            <ul className="nav_links">
                {
                    links.map((link) => <li key={link.title}><NavLink to={link.url} key={link.url} className='nav_links_link'> {link.title} </NavLink></li>)
                }
            </ul>

            <a href="" className="nav_box"> <img src={box} alt="" /> </a>

        </nav>

    </>
  )
}
