// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import Button from 'react-bootstrap/Button';


// export function Asia() {
//   return (
//     <main class="world-info">
//       <div style={{ textAlign: 'right', marginBottom: '20px' }}>
// <Button variant='primary' onClick={() => navigate('/favorite')}>
//         Favorite
//       </Button>
//         </div>
//         <h1>Asia</h1>
//         <h3>Vietnamese Pho</h3>
        
        
//             <img src= { "/images/phoRecipe.jpg" } alt="pho recipe" />
//             <p style= {{ textAlign: 'center', fontSize: '16px' }}>Pho from Ho Chi Min City</p>
//             <h3 >Ingredients</h3>
//             <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//   <li>Oxtail</li>
//   <li>Onion</li>
//   <li>Ginger</li>
//   <li>Salt</li>
//   <li>Pho Bo cube</li>
//   <li>Beef Pho concentrate</li>
//   <li>Optional meats: Brisket, Flank, Steak cuts, meatballs</li>
//   <li>Optional veggies: Bean sprouts, basil, cilantro, green onion</li>
// </ul>

//             <h3>Instructions</h3>
//             <p style={{textAlign: 'center'}}>Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger.
//                 Then add 1-2 cubes pho bo if you're also using the concentrate.
//                 If you use just the cubes, you can add the whole cube pack.
//                 Add salt, 2 or 3 tablespoon depending on how big your pot is. You can always add 
//                 more later if you need to. Then bring the pot to boil.
//                 <br/>
//                 <br/>
//                 While preparing the big pot, in a smaller bot add water and bring it to a boil.
//                 Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse
//                 with cold water to get rid of impurities. Add the oxtail to the stock pot. 
//                 Add pho concentrate (if using cube and concentrate). Boil everything on medium-low 
//                 heat for a couple of hours before serving.
//                 <br/>
//                 <br/>
//                 Once broth is completed, you can prepare the bowl based on your liking.
//                 In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending
//                 on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil,
//                 green onions, cilantro depending on your liking. 
//                 <br/>
//                 <br/>
//                 Enjoy!
//                 </p>
//     </main>
 
//   );
// }
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

// export function Asia() {
//   const navigate = useNavigate();

//   const addToFavorites = () => {
//     const soup = {
//       id: 'pho',
//       name: 'Vietnamese Pho',
//       region: 'Asia',
//       image: '/images/phoRecipe.jpg',
//       path: '/asia'
//     };

//     // Get existing favorites from localStorage
//     const savedFavorites = localStorage.getItem('favorites');
//     let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

//     // Check if already in favorites
//     const alreadyExists = favorites.some(fav => fav.id === soup.id);
    
//     if (!alreadyExists) {
//       favorites.push(soup);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       alert('Added to favorites!');
//     } else {
//       alert('Already in favorites!');
//     }

//     // Navigate to favorites page
//     navigate('/favorites');
//   };

//   return (
//     <main className="world-info">
//   <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
//     <div>
//       <h1 style={{ margin: 0 }}>Asia</h1>
//       <h3 style={{ margin: 0 }}>Vietnamese Pho</h3>
//     </div>
//     <Button 
//       variant='primary' 
//       onClick={addToFavorites}
//       style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
//     >
//       Favorite
//     </Button>
//   </div>
      
//       <img src={"/images/phoRecipe.jpg"} alt="pho recipe" />
//       <p style={{ textAlign: 'center', fontSize: '16px' }}>Pho from Ho Chi Min City</p>
      
//       <h3>Ingredients</h3>
//       <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//         <li>Oxtail</li>
//         <li>Onion</li>
//         <li>Ginger</li>
//         <li>Salt</li>
//         <li>Pho Bo cube</li>
//         <li>Beef Pho concentrate</li>
//         <li>Optional meats: Brisket, Flank, Steak cuts, meatballs</li>
//         <li>Optional veggies: Bean sprouts, basil, cilantro, green onion</li>
//       </ul>

//       <h3>Instructions</h3>
//       <p style={{ textAlign: 'center' }}>
//         Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger.
//         Then add 1-2 cubes pho bo if you're also using the concentrate.
//         If you use just the cubes, you can add the whole cube pack.
//         Add salt, 2 or 3 tablespoon depending on how big your pot is. You can always add 
//         more later if you need to. Then bring the pot to boil.
//         <br/>
//         <br/>
//         While preparing the big pot, in a smaller bot add water and bring it to a boil.
//         Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse
//         with cold water to get rid of impurities. Add the oxtail to the stock pot. 
//         Add pho concentrate (if using cube and concentrate). Boil everything on medium-low 
//         heat for a couple of hours before serving.
//         <br/>
//         <br/>
//         Once broth is completed, you can prepare the bowl based on your liking.
//         In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending
//         on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil,
//         green onions, cilantro depending on your liking. 
//         <br/>
//         <br/>
//         Enjoy!
//       </p>
//     </main>
//   );
// }

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// export function Asia() {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

//   const addToFavorites = () => {
//     const soup = {
//       id: 'pho',
//       name: 'Vietnamese Pho',
//       region: 'Asia',
//       image: '/images/phoRecipe.jpg',
//       path: '/asia'
//     };

//     // Get existing favorites from localStorage
//     const savedFavorites = localStorage.getItem('favorites');
//     let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

//     // Check if already in favorites
//     const alreadyExists = favorites.some(fav => fav.id === soup.id);
    
//     if (!alreadyExists) {
//       favorites.push(soup);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       setModalMessage('Vietnamese Pho has been added to your favorites!');
//       setIsAlreadyFavorite(false);
//     } else {
//       setModalMessage('Vietnamese Pho is already in your favorites!');
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
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '20px' }}>
//         <div></div>
//         <div style={{ textAlign: 'center' }}>
//           <h1 style={{ margin: 0 }}>Asia</h1>
//           <h3 style={{ margin: 0 }}>Vietnamese Pho</h3>
//         </div>
//         <div style={{ textAlign: 'right' }}>
//           <Button variant='primary' onClick={addToFavorites}>
//             Favorite
//           </Button>
//         </div>
//       </div>
      
//       <img src={"/images/phoRecipe.jpg"} alt="pho recipe" />
//       <p style={{ textAlign: 'center', fontSize: '16px' }}>Pho from Ho Chi Min City</p>
      
//       <h3>Ingredients</h3>
//       <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
//         <li>Oxtail</li>
//         <li>Onion</li>
//         <li>Ginger</li>
//         <li>Salt</li>
//         <li>Pho Bo cube</li>
//         <li>Beef Pho concentrate</li>
//         <li>Optional meats: Brisket, Flank, Steak cuts, meatballs</li>
//         <li>Optional veggies: Bean sprouts, basil, cilantro, green onion</li>
//       </ul>

//       <h3>Instructions</h3>
//       <p style={{ textAlign: 'center' }}>
//         Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger.
//         Then add 1-2 cubes pho bo if you're also using the concentrate.
//         If you use just the cubes, you can add the whole cube pack.
//         Add salt, 2 or 3 tablespoon depending on how big your pot is. You can always add 
//         more later if you need to. Then bring the pot to boil.
//         <br/>
//         <br/>
//         While preparing the big pot, in a smaller bot add water and bring it to a boil.
//         Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse
//         with cold water to get rid of impurities. Add the oxtail to the stock pot. 
//         Add pho concentrate (if using cube and concentrate). Boil everything on medium-low 
//         heat for a couple of hours before serving.
//         <br/>
//         <br/>
//         Once broth is completed, you can prepare the bowl based on your liking.
//         In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending
//         on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil,
//         green onions, cilantro depending on your liking. 
//         <br/>
//         <br/>
//         Enjoy!
//       </p>

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

export function Asia() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  const addToFavorites = async () => {
    try {
      const response = await fetch('/api/favorites/2', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) {
          setModalMessage('Please login to add favorites!');
          setIsAlreadyFavorite(false);
        } else {
          setModalMessage(error.msg || 'Vietnamese Pho is already in your favorites!');
          setIsAlreadyFavorite(true);
        }
      } else {
        setModalMessage('Vietnamese Pho has been added to your favorites!');
        setIsAlreadyFavorite(false);
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '20px' }}>
        <div></div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>Asia</h1>
          <h3 style={{ margin: 0 }}>Vietnamese Pho</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button variant='primary' onClick={addToFavorites}>
            Favorite
          </Button>
        </div>
      </div>
      
      <img src={"/images/phoRecipe.jpg"} alt="pho recipe" />
      <p style={{ textAlign: 'center', fontSize: '16px' }}>Pho from Ho Chi Min City</p>
      
      <h3>Ingredients</h3>
      <ul style={{ textAlign: 'center', listStylePosition: 'inside', listStyle: 'none', padding: 0 }}>
        <li>Oxtail</li>
        <li>Onion</li>
        <li>Ginger</li>
        <li>Salt</li>
        <li>Pho Bo cube</li>
        <li>Beef Pho concentrate</li>
        <li>Optional meats: Brisket, Flank, Steak cuts, meatballs</li>
        <li>Optional veggies: Bean sprouts, basil, cilantro, green onion</li>
      </ul>

      <h3>Instructions</h3>
      <p style={{ textAlign: 'center' }}>
        Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger.
        Then add 1-2 cubes pho bo if you're also using the concentrate.
        If you use just the cubes, you can add the whole cube pack.
        Add salt, 2 or 3 tablespoon depending on how big your pot is. You can always add 
        more later if you need to. Then bring the pot to boil.
        <br/>
        <br/>
        While preparing the big pot, in a smaller bot add water and bring it to a boil.
        Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse
        with cold water to get rid of impurities. Add the oxtail to the stock pot. 
        Add pho concentrate (if using cube and concentrate). Boil everything on medium-low 
        heat for a couple of hours before serving.
        <br/>
        <br/>
        Once broth is completed, you can prepare the bowl based on your liking.
        In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending
        on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil,
        green onions, cilantro depending on your liking. 
        <br/>
        <br/>
        Enjoy!
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