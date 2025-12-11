// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import './favorite.css';

// export function Favorite() {
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     // Load favorites from localStorage when component mounts
//     const savedFavorites = localStorage.getItem('favorites');
//     if (savedFavorites) {
//       setFavorites(JSON.parse(savedFavorites));
//     }
//   }, []);

// const removeFavorite = (id, name) => {
//   const confirmed = window.confirm(`Remove "${name}" from favorites?`);
  
//   if (confirmed) {
//     const updatedFavorites = favorites.filter(fav => fav.id !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     alert('Removed from favorites!');
//   }
// };

//   return (
//     <main className="favorites-page">
//       <h1>My Favorite Soups</h1>
      
//       {favorites.length === 0 ? (
//         <div className="no-favorites">
//           <p>You haven't added any favorites yet!</p>
//           <Button variant="primary" onClick={() => navigate('/world')}>
//             Browse Soups
//           </Button>
//         </div>
//       ) : (
//         <div className="favorites-grid">
//           {favorites.map((soup) => (
//             <div key={soup.id} className="favorite-card">
//               <img src={soup.image} alt={soup.name} className="favorite-image" />
//               <div className="favorite-content">
//                 <h3>{soup.name}</h3>
//                 <p className="favorite-region">{soup.region}</p>
//                 <div className="favorite-actions">
//                   <Button 
//                     variant="primary" 
//                     onClick={() => navigate(soup.path)}
//                   >
//                     View Recipe
//                   </Button>
//                   <Button 
//   variant="danger" 
//   onClick={() => removeFavorite(soup.id, soup.name)}
// >
//   Remove
// </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
// 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './favorite.css';
import { useWebSocket } from '../hooks/useWebSocket';

export function Favorite() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [soupToRemove, setSoupToRemove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // WebSocket hook for real-time notifications
  const { notifyRecipeUnfavorited } = useWebSocket();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/favorites');
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('Please login to view your favorites');
          setLoading(false);
          return;
        }
        throw new Error('Failed to load favorites');
      }

      const data = await response.json();
      setFavorites(data);
      setError('');
    } catch (err) {
      console.error('Failed to load favorites:', err);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (soup) => {
    setSoupToRemove(soup);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    if (soupToRemove) {
      try {
        const response = await fetch(`/api/favorites/${soupToRemove.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedFavorites = favorites.filter(fav => fav.id !== soupToRemove.id);
          setFavorites(updatedFavorites);
          
          // Broadcast unfavorite via WebSocket
          const username = localStorage.getItem('userName') || 'Anonymous';
          notifyRecipeUnfavorited(soupToRemove.name, username);
        } else {
          const error = await response.json();
          alert(error.msg || 'Failed to remove favorite');
        }
      } catch (err) {
        console.error('Failed to remove favorite:', err);
        alert('Failed to remove favorite. Please try again.');
      }
    }
    setShowModal(false);
    setSoupToRemove(null);
  };

  const cancelRemove = () => {
    setShowModal(false);
    setSoupToRemove(null);
  };

  if (loading) {
    return (
      <main className="favorites-page">
        <h1>My Favorite Soups</h1>
        <div className="no-favorites">
          <p>Loading your favorites...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="favorites-page">
        <h1>My Favorite Soups</h1>
        <div className="no-favorites">
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/account')}>
            Go to Login
          </Button>
        </div>
      </main>
    );
  }

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
                <p className="favorite-region">{soup.continent}</p>
                <div className="favorite-actions">
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      // Navigate based on continent
                      const path = soup.continent.toLowerCase().replace(' ', '');
                      navigate(`/${path}`);
                    }}
                  >
                    View Recipe
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleRemoveClick(soup)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={cancelRemove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove from Favorites?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove <strong>{soupToRemove?.name}</strong> from your favorites?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmRemove}>
            Yes, Remove
          </Button>
          <Button variant="secondary" onClick={cancelRemove}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}