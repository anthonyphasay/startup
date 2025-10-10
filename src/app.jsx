import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Account } from './account/account';
import { Asia } from './asia/asia';
import { Europe } from './europe/europe';
import { NorthAmerica } from './northAmerica/northAmerica';
import { World } from './world/world';
import { Home } from './home/home';

export default function App() {
  return ( 
  <BrowserRouter>
  <div className="body text-dark">    
        <header>
        <nav className="menu">
        <div className="title-logo">
         <NavLink to="/" style= {{ textDecoration: 'none' }} className="title"><h1>Soups Galore</h1></NavLink>
        </div>
         <div className="menu_links">
             <ul className="menu_links-list">
            <li><NavLink to="/" className="home">Home</NavLink></li>
            <li className="dropdown">
                <NavLink to="world" className="dropbtn">World</NavLink>
                <div className="dropdown-content">
                <NavLink to="asia">Asia</NavLink>
                <NavLink to="northAmerica">North America</NavLink>
                <NavLink to="europe">Europe</NavLink>
                </div>
            </li>
            <li style={{ float: 'right' }}><NavLink className="account" to="account">Account</NavLink></li>
            </ul>
         </div>
        </nav>
    </header>

    <Routes>
    <Route path='/' element={<Home />} exact />
    <Route path='/account' element={<Account />} />
    <Route path='/asia' element={<Asia />} />
    <Route path='/europe' element={<Europe />} />
    <Route path='/northAmerica' element={<NorthAmerica />} />
    <Route path='/world' element={<World />} />
    {/* <Route path='/home' element={<Home />} /> */}
    <Route path='*' element={<NotFound />} />
    </Routes>

        {/* <main className="world-info">
        <h2 style={{textAlign: 'center'}}>Welcome</h2>
        <p style={{textAlign: 'center'}}>This is the place for all things soup. <br/><br/>If you want to save your favorite recipes, you can click on Account
        and create one! <br/> When you log in, you can always have your favorite soup ready so you don't have to search it all the time. <br/><br/>
    We have soups from around the world and will continually add more 😋</p>
        <a href="asia.html"><img src= {"images/pho.jpg"} alt="pho" /></a>
        </main> */}
    <div className="footer" style={{textAlign: 'center'}}>
        <footer>
        {/* <h1>3RD PARTY API PLACEHOLDER</h1> */}
            <a href="https://github.com/anthonyphasay/startup" target="_blank"><h2>Github.com</h2></a>
        <p>© 2025 Tony Phasay @ Soups Galore</p>
        </footer>
    </div>
    </div>
    </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}