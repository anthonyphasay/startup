import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
      });
      localStorage.removeItem('userName');
      props.onLogout();
    } catch (err) {
      console.error('Logout failed:', err);
      // Still logout locally even if server call fails
      localStorage.removeItem('userName');
      props.onLogout();
    }
  }

  return (
    <div>
      <img src="images/greeting.jpg" alt="Nightmare Soup" className='login-image' />
      <div className='playerName'>{props.userName}</div>
      <div className='button-group'>
        <Button variant='primary' onClick={() => navigate('/')}>
          Enter
        </Button>
        <Button variant='primary' onClick={() => navigate('/favorites')}>
          Favorites
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}