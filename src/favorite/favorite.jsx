import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './favorite.css';

export function Favorite() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

const removeFavorite = (id, name) => {
  const confirmed = window.confirm(`Remove "${name}" from favorites?`);
  
  if (confirmed) {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Removed from favorites!');
  }
};

  return (
    <main className="favorites-page">
      <h1>My Favorite Soups</h1>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any favorites yet!</p>
          <Button variant="primary" onClick={() => navigate('/world')}>
            Browse Soups
          </Button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((soup) => (
            <div key={soup.id} className="favorite-card">
              <img src={soup.image} alt={soup.name} className="favorite-image" />
              <div className="favorite-content">
                <h3>{soup.name}</h3>
                <p className="favorite-region">{soup.region}</p>
                <div className="favorite-actions">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate(soup.path)}
                  >
                    View Recipe
                  </Button>
                  <Button 
  variant="danger" 
  onClick={() => removeFavorite(soup.id, soup.name)}
>
  Remove
</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}