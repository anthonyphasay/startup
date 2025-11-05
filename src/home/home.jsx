import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Quote } from '../components/quotes.jsx';

export function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/recipes');
      
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (err) {
      console.error('Failed to load recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="world-info">
      <h2 style={{textAlign: 'center'}}>Welcome</h2>
      <p style={{textAlign: 'center'}}>
        This is the place for all things soup. <br/><br/>
        If you want to save your favorite recipes, you can click on Account
        and create one! <br/> 
        When you log in, you can always have your favorite soup ready so you don't have to search it all the time. <br/><br/>
        We have soups from around the world and will continually add more 😋
      </p>
      
      <NavLink to="asia">
        <img src={"images/pho.jpg"} alt="pho" />
      </NavLink>
      
      <br></br>
      
      <h2>Quote of the day: </h2>
      <Quote/>
      
      {!loading && recipes.length > 0 && (
        <div style={{marginTop: '20px'}}>
          <h2 style={{textAlign: 'center'}}>Available Recipes</h2>
          <div style={{textAlign: 'center'}}>
            {recipes.map(recipe => (
              <div key={recipe.id} style={{margin: '10px 0'}}>
                <strong>{recipe.name}</strong> - {recipe.continent}
                <br/>
                <em>{recipe.description}</em>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}