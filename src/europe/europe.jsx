// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

// export function Europe() {
//   const navigate = useNavigate();

//   const addToFavorites = () => {
//     const soup = {
//       id: 'weddingSoup',
//       name: 'Italian Wedding Soup',
//       region: 'Europe',
//       image: '/images/italian noodle soup.jpg',
//       path: '/europe'
//     };

//     const savedFavorites = localStorage.getItem('favorites');
//     let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

//     const alreadyExists = favorites.some(fav => fav.id === soup.id);
    
//     if (!alreadyExists) {
//       favorites.push(soup);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       alert('Added to favorites!');
//     } else {
//       alert('Already in favorites!');
//     }
//     navigate('/favorites');
//   };
//   return (
//     <main class="world-info">
//       <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
//     <div>
//       <h1 style={{ margin: 0 }}>Europe</h1>
//       <h3 style={{ margin: 0 }}>Italian Wedding Soup</h3>
//     </div>
//     <Button 
//       variant='primary' 
//       onClick={addToFavorites}
//       style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
//     >
//       Favorite
//     </Button>
//   </div>
//         <img src="images/italian noodle soup.jpg" alt="" />
//         <h2>Ingredients</h2>

//             <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//                 <li>Lean Ground Beef</li>
//                 <li>Ground Pork</li>
//                 <li>Spicy Italian Ground Beef (if not making meatballs from scratch)</li>
//                 <li>Fresh bread crumbs</li>
//                 <li>Parsley</li>
//                 <li>Oregano</li>
//                 <li>Parmesan</li>
//                 <li>Egg</li>
//                 <li>Onion</li>
//                 <li>Garlic</li>
//                 <li>Favorite type of pasta</li>
//                 <li>Salt and black pepper</li>
//                 <li>Olive Oil</li>
//                 <li>Low sodium chicken broth</li>
//             </ul>
//         <h2>Instructions</h2>
//         <p>
//             First make mini meatball mixture by adding beef and pork in a mixing bowl. Add crumbs, eggs, parsley, oregano, parmesan, 1 tsp salt
//             1/4 tsp pepper. Then break and tass mixture with hands. Create meatballs based on a size you want.</p>
//             <br/>
//             <br/>
//             <p>
//             In large non-stick sillet, heat 1 Tablespoon of olive oil over medium-high heat. Add the meatballs and cook until they turn brown, turning
//             occasionally about 4 minutes total. Then transfer the meatballs to a plate with paper towel. Leave the oil in skillet.
//             <br/>
//             <br/>
//             Now, we can heat 1 tablespoon of olive oil in a large pot over medium-high heat. Add carrots, onions, and celery and saute until they have
//             soften, this should take around 6-8 minutes. Add garlic and saute 1 minute longer.
//             <br/>
//             <br/>
//             Now pour the chicken broth broth in the sauteed veggies pot, season soup with salt and pepper to tates then bring it to boil. Stir the pasta
//             and meatballs, reduce to medium low heat.
//             <br/>
//             <br/>
//             Cover and cook while stirring occasionally until pasta is tender and meatballs are cooked all the way through. Add spinach the last minute of cooking
//             along with some parmesan cheese.
//             <br/>
//             <br/>
//             Now serve your meal and enjoy getting married!
//         </p>
//     </main>
//   );
// }
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// export function Europe() {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

//   const addToFavorites = () => {
//     const soup = {
//       id: 'weddingSoup',
//       name: 'Italian Wedding Soup',
//       region: 'Europe',
//       image: '/images/italian noodle soup.jpg',
//       path: '/europe'
//     };

//     const savedFavorites = localStorage.getItem('favorites');
//     let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

//     const alreadyExists = favorites.some(fav => fav.id === soup.id);
    
//     if (!alreadyExists) {
//       favorites.push(soup);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       setModalMessage('Italian Wedding Soup has been added to your favorites!');
//       setIsAlreadyFavorite(false);
//     } else {
//       setModalMessage('Italian Wedding Soup is already in your favorites!');
//       setIsAlreadyFavorite(true);
//     }

//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     if (!isAlreadyFavorite) {
//       navigate('/favorites');
//     }
//   };

//   const handleViewFavorites = () => {
//     setShowModal(false);
//     navigate('/favorites');
//   };

//   return (
//     <main className="world-info">
//       <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
//         <div>
//           <h1 style={{ margin: 0 }}>Europe</h1>
//           <h3 style={{ margin: 0 }}>Italian Wedding Soup</h3>
//         </div>
//         <Button 
//           variant='primary' 
//           onClick={addToFavorites}
//           style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
//         >
//           Favorite
//         </Button>
//       </div>
      
//       <img src="images/italian noodle soup.jpg" alt="Italian Wedding Soup" />
//       <h2>Ingredients</h2>

//       <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//         <li>Lean Ground Beef</li>
//         <li>Ground Pork</li>
//         <li>Spicy Italian Ground Beef (if not making meatballs from scratch)</li>
//         <li>Fresh bread crumbs</li>
//         <li>Parsley</li>
//         <li>Oregano</li>
//         <li>Parmesan</li>
//         <li>Egg</li>
//         <li>Onion</li>
//         <li>Garlic</li>
//         <li>Favorite type of pasta</li>
//         <li>Salt and black pepper</li>
//         <li>Olive Oil</li>
//         <li>Low sodium chicken broth</li>
//       </ul>
      
//       <h2>Instructions</h2>
//       <p>
//         First make mini meatball mixture by adding beef and pork in a mixing bowl. Add crumbs, eggs, parsley, oregano, parmesan, 1 tsp salt
//         1/4 tsp pepper. Then break and tass mixture with hands. Create meatballs based on a size you want.
//       </p>
//       <br/>
//       <br/>
//       <p>
//         In large non-stick sillet, heat 1 Tablespoon of olive oil over medium-high heat. Add the meatballs and cook until they turn brown, turning
//         occasionally about 4 minutes total. Then transfer the meatballs to a plate with paper towel. Leave the oil in skillet.
//         <br/>
//         <br/>
//         Now, we can heat 1 tablespoon of olive oil in a large pot over medium-high heat. Add carrots, onions, and celery and saute until they have
//         soften, this should take around 6-8 minutes. Add garlic and saute 1 minute longer.
//         <br/>
//         <br/>
//         Now pour the chicken broth broth in the sauteed veggies pot, season soup with salt and pepper to tates then bring it to boil. Stir the pasta
//         and meatballs, reduce to medium low heat.
//         <br/>
//         <br/>
//         Cover and cook while stirring occasionally until pasta is tender and meatballs are cooked all the way through. Add spinach the last minute of cooking
//         along with some parmesan cheese.
//         <br/>
//         <br/>
//         Now serve your meal and enjoy getting married!
//       </p>

//       {/* Success/Info Modal */}
//       <Modal show={showModal} onHide={handleModalClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {isAlreadyFavorite ? '⭐ Already a Favorite' : '✅ Added to Favorites'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {modalMessage}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             {isAlreadyFavorite ? 'Close' : 'Stay Here'}
//           </Button>
//           <Button variant="primary" onClick={handleViewFavorites}>
//             View Favorites
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </main>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useWebSocket } from '../hooks/useWebSocket';

export function Europe() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);
  
  // WebSocket hook for real-time notifications
  const { notifyRecipeFavorited } = useWebSocket();

  const addToFavorites = async () => {
    try {
      // Recipe ID '3' is Italian Wedding Soup in the backend
      const response = await fetch('/api/favorites/3', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) {
          setModalMessage('Please login to add favorites!');
          setIsAlreadyFavorite(false);
        } else {
          setModalMessage(error.msg || 'Italian Wedding Soup is already in your favorites!');
          setIsAlreadyFavorite(true);
        }
      } else {
        setModalMessage('Italian Wedding Soup has been added to your favorites!');
        setIsAlreadyFavorite(false);
        
        // Broadcast favorite via WebSocket
        const username = localStorage.getItem('userName') || 'Anonymous';
        notifyRecipeFavorited('Italian Wedding Soup', username);
      }

      setShowModal(true);
    } catch (err) {
      console.error('Failed to add to favorites:', err);
      setModalMessage('Failed to add to favorites. Please try again.');
      setIsAlreadyFavorite(false);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (!isAlreadyFavorite && !modalMessage.includes('login')) {
      navigate('/favorites');
    } else if (modalMessage.includes('login')) {
      navigate('/account');
    }
  };

  const handleViewFavorites = () => {
    setShowModal(false);
    if (modalMessage.includes('login')) {
      navigate('/account');
    } else {
      navigate('/favorites');
    }
  };

  return (
    <main className="world-info">
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Europe</h1>
          <h3 style={{ margin: 0 }}>Italian Wedding Soup</h3>
        </div>
        <Button 
          variant='primary' 
          onClick={addToFavorites}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        >
          Favorite
        </Button>
      </div>
      
      <img src="images/italian noodle soup.jpg" alt="Italian Wedding Soup" />
      <h2>Ingredients</h2>

      <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
        <li>Lean Ground Beef</li>
        <li>Ground Pork</li>
        <li>Spicy Italian Ground Beef (if not making meatballs from scratch)</li>
        <li>Fresh bread crumbs</li>
        <li>Parsley</li>
        <li>Oregano</li>
        <li>Parmesan</li>
        <li>Egg</li>
        <li>Onion</li>
        <li>Garlic</li>
        <li>Favorite type of pasta</li>
        <li>Salt and black pepper</li>
        <li>Olive Oil</li>
        <li>Low sodium chicken broth</li>
      </ul>
      
      <h2>Instructions</h2>
      <p>
        First make mini meatball mixture by adding beef and pork in a mixing bowl. Add crumbs, eggs, parsley, oregano, parmesan, 1 tsp salt
        1/4 tsp pepper. Then break and tass mixture with hands. Create meatballs based on a size you want.
      </p>
      <br/>
      <br/>
      <p>
        In large non-stick sillet, heat 1 Tablespoon of olive oil over medium-high heat. Add the meatballs and cook until they turn brown, turning
        occasionally about 4 minutes total. Then transfer the meatballs to a plate with paper towel. Leave the oil in skillet.
        <br/>
        <br/>
        Now, we can heat 1 tablespoon of olive oil in a large pot over medium-high heat. Add carrots, onions, and celery and saute until they have
        soften, this should take around 6-8 minutes. Add garlic and saute 1 minute longer.
        <br/>
        <br/>
        Now pour the chicken broth broth in the sauteed veggies pot, season soup with salt and pepper to tates then bring it to boil. Stir the pasta
        and meatballs, reduce to medium low heat.
        <br/>
        <br/>
        Cover and cook while stirring occasionally until pasta is tender and meatballs are cooked all the way through. Add spinach the last minute of cooking
        along with some parmesan cheese.
        <br/>
        <br/>
        Now serve your meal and enjoy getting married!
      </p>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMessage.includes('login') ? '🔒 Login Required' : isAlreadyFavorite ? '⭐ Already a Favorite' : '✅ Added to Favorites'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {isAlreadyFavorite ? 'Close' : 'Stay Here'}
          </Button>
          <Button variant="primary" onClick={handleViewFavorites}>
            {modalMessage.includes('login') ? 'Go to Login' : 'View Favorites'}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}