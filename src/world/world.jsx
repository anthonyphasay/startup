import React from 'react';
import { NavLink } from 'react-router-dom';

export function World() {
  return (
    <main class="world-info">
            <h1>Soups from around the world</h1>
            <h2>Some facts and information about the soups and where they are from.</h2>
            
            <h1 class="asia-description"><em>Asia</em></h1>
            <NavLink to="asia.html"><img src={"images/japan.jpg"} alt="" /></NavLink>
            <text>
            <p class="world-description">Asia has a variety of soups as it contains many, many countries. This ranges from
                a savory soup, Kuoy Thiew from Thailand to lamb stew soup, Laghman, from Tajikistan.</p>
                {"\n"}
                {"\n"}
                <img src={"images/laghman.jpg"} alt="" />
                <p style={{textAlign: 'center', fontSize: '16px'}}>Laghman, Tajikistan soup, made from lamb</p>
                {"\n"}
                {"\n"}
            <hr />
            <h1 class="northamerica-description"><em>North America</em></h1>
            <NavLink to="northAmerica.html"><img src={"images/rocky.webp"} alt=""/></NavLink>
            <p class="world-description">This beautiful land has many cultures and soups, especially in America and Canada. These soups can come from all around the world
                but some soups that most people will know is Chicken Noodle soup or Mexican Pozole. </p>
                {"\n"}
                {"\n"}
                <img src="images/pozole.jpg" alt=""/>
                <p style={{textAlign: 'center', fontSize: '16px'}}>Pozole from Mexico</p>
                {"\n"}
                {"\n"}
            <hr />
            <h1 class="europe"><em>Europe</em></h1>
            <NavLink to="europe.html"><img src={"images/vienna-austria.jpg"} alt=""/></NavLink>
            <p class="world-description">With a rich history and many different cultures, Europe has some soups that are famous too, including French Onion Soup (France!) and Minestrone from Italy.</p>
            <img src={"images/minestrone.webp"} alt=""/>
            <p style= {{textAlign: 'center', fontSize: '16px' }}>Minestrone from Italy</p>
           </text> 
        </main>
  );
}