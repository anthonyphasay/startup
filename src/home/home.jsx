import React from 'react';
import { NavLink } from 'react-router-dom';
import { Quote } from '../components/quotes.jsx';

export function Home() {
  return ( 
         <main className="world-info">
        <h2 style={{textAlign: 'center'}}>Welcome</h2>
        <p style={{textAlign: 'center'}}>This is the place for all things soup. <br/><br/>If you want to save your favorite recipes, you can click on Account
        and create one! <br/> When you log in, you can always have your favorite soup ready so you don't have to search it all the time. <br/><br/>
    We have soups from around the world and will continually add more 😋</p>
        <NavLink to="asia"><img src= {"images/pho.jpg"} alt="pho" /></NavLink>
        <br>
        </br>
        <h2>Quote of the day: </h2>
        <Quote/>
        </main>
        
    );
}

// function getQuote() {
//   // This will be replaced with a 3rd party service call
//   return { String: 'Inspirational Quotes' };
// }
// const weather = getQuote();

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}