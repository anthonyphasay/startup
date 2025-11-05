import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userName, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        setDisplayError(error.msg);
        return;
      }

      const data = await response.json();
      localStorage.setItem('userName', data.username);
      props.onLogin(data.username);
    } catch (err) {
      setDisplayError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  }

  async function createUser() {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userName, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        setDisplayError(error.msg);
        return;
      }

      const data = await response.json();
      localStorage.setItem('userName', data.username);
      props.onLogin(data.username);
    } catch (err) {
      setDisplayError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  }

  return (
    <>
      <img src="images/nightmareSoup.jpg" alt="Nightmare Soup" className='login-image' />
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username@</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password🔒</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <div className='button-group'>
          <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
            Login
          </Button>
          <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
            Create
          </Button>
        </div>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}