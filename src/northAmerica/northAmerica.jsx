// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

// export function NorthAmerica() {
//   const navigate = useNavigate();

//   const addToFavorites = () => {
//     const soup = {
//       id: 'chickenNoodle',
//       name: 'Chicken Noodle Soup',
//       region: 'North America',
//       image: '/images/chickennoddle2.jpg',
//       path: '/northAmerica'
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
//       <h1 style={{ margin: 0 }}>North America</h1>
//       <h3 style={{ margin: 0 }}>Chicken Noodle Soup</h3>
//     </div>
//     <Button 
//       variant='primary' 
//       onClick={addToFavorites}
//       style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
//     >
//       Favorite
//     </Button>
//     </div>
//         <img src="images/chickennoddle2.jpg" class="chicken" />
//         <h2>Ingredients</h2>
//                   *note: These will be approximate and not exact! 
//             <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//                 <li>2 large of chicken breast</li>
//                 <li>Carrots</li>
//                 <li>Peas</li>
//                 <li>Celery</li>
//                 <li>Onion</li>
//                 <li>Garlic 2-3 cloves</li>
//                 <li>Low sodium chicken broth</li>
//                 <li>Egg noodles</li>
//                 <li>Salt</li>
//                 <li>Pepper</li>
//                 <li>Garlic Salt</li>
//                 <li>Rosemary</li>
//                 <li>Oregeno</li>
//                 <li>Chicken boulion cube</li>
//                 <li>Optional: Cilantro</li>
//             </ul>

//         <h2>Instructions</h2>
//         <p>In a medium size pot. Add water half way, add 1-2 chicken boulion cube. Place 2 chicken breast in water.
//             Bring water to boil. Add chicken breast and cover with lid. Cook until you can pull 
//             apart the chicken breast easily, it will take around 25-30 minutes. 
//             Then remove chicken out of stove, into a cutting board and use fork to shred chicken. </p>
//             <br/>
//             <br/>
//             <p>In a large pot. Add olive oil till hot. Cut up celery, carrots, and onion. Add onion to the pot and sauteed 
//             until onion change slightly in color, add salt, pepper, garlic salt to the onion. Then add garlic, sauteed for 2-5 minutes. Then add carrots and celery at the 
//             same time. Sauteed the veggies for 5-7 minutes. Then add the shredded chicken. Add the chicken broth (32-64 Oz of chicken broth or water/chicken boulion mixture of the same amount).
//             Bring pot to boil. Add the egg noodles. Cover, and let it cook until noodles are tender.
//             Add peas and cilantro 5 minutes until end of cooking process. Season to taste. Remove soup from heat and let it stand for 20 minutes.
//             <br/>
//             <br/>
//             Serve and eat!
//         </p>
//     </main>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function NorthAmerica() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  const addToFavorites = () => {
    const soup = {
      id: 'chickenNoodle',
      name: 'Chicken Noodle Soup',
      region: 'North America',
      image: '/images/chickennoddle2.jpg',
      path: '/northAmerica'
    };

    const savedFavorites = localStorage.getItem('favorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    const alreadyExists = favorites.some(fav => fav.id === soup.id);
    
    if (!alreadyExists) {
      favorites.push(soup);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setModalMessage('Chicken Noodle Soup has been added to your favorites!');
      setIsAlreadyFavorite(false);
    } else {
      setModalMessage('Chicken Noodle Soup is already in your favorites!');
      setIsAlreadyFavorite(true);
    }

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (!isAlreadyFavorite) {
      navigate('/favorites');
    }
  };

  const handleViewFavorites = () => {
    setShowModal(false);
    navigate('/favorites');
  };

  return (
    <main className="world-info">
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>North America</h1>
          <h3 style={{ margin: 0 }}>Chicken Noodle Soup</h3>
        </div>
        <Button 
          variant='primary' 
          onClick={addToFavorites}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        >
          Favorite
        </Button>
      </div>
      
      <img src="images/chickennoddle2.jpg" className="chicken" alt="Chicken Noodle Soup" />
      <h2>Ingredients</h2>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>*note: These will be approximate and not exact!</p>
      
      <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
        <li>2 large of chicken breast</li>
        <li>Carrots</li>
        <li>Peas</li>
        <li>Celery</li>
        <li>Onion</li>
        <li>Garlic 2-3 cloves</li>
        <li>Low sodium chicken broth</li>
        <li>Egg noodles</li>
        <li>Salt</li>
        <li>Pepper</li>
        <li>Garlic Salt</li>
        <li>Rosemary</li>
        <li>Oregeno</li>
        <li>Chicken boulion cube</li>
        <li>Optional: Cilantro</li>
      </ul>

      <h2>Instructions</h2>
      <p>
        In a medium size pot. Add water half way, add 1-2 chicken boulion cube. Place 2 chicken breast in water.
        Bring water to boil. Add chicken breast and cover with lid. Cook until you can pull 
        apart the chicken breast easily, it will take around 25-30 minutes. 
        Then remove chicken out of stove, into a cutting board and use fork to shred chicken.
      </p>
      <br/>
      <br/>
      <p>
        In a large pot. Add olive oil till hot. Cut up celery, carrots, and onion. Add onion to the pot and sauteed 
        until onion change slightly in color, add salt, pepper, garlic salt to the onion. Then add garlic, sauteed for 2-5 minutes. Then add carrots and celery at the 
        same time. Sauteed the veggies for 5-7 minutes. Then add the shredded chicken. Add the chicken broth (32-64 Oz of chicken broth or water/chicken boulion mixture of the same amount).
        Bring pot to boil. Add the egg noodles. Cover, and let it cook until noodles are tender.
        Add peas and cilantro 5 minutes until end of cooking process. Season to taste. Remove soup from heat and let it stand for 20 minutes.
        <br/>
        <br/>
        Serve and eat!
      </p>

      {/* Success/Info Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isAlreadyFavorite ? '⭐ Already a Favorite' : '✅ Added to Favorites'}
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
            View Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}