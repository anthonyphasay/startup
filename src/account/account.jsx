import React from 'react';

// export function Account() {
//   return (
    
//     <main className="world-info">
//             <h2>Login</h2>
//             <label for="first">Username:</label>
// <input type="text" id="first" name="first" 
//     placeholder="Enter your Username" required />

// <label for="password">Password:</label>
// <input type="password" id="password" name="password" 
//     placeholder="Enter your Password" required />
//     <button type="submit"> Submit </button>
//     <br />
//     <br />
//     <h1>DATABASE PLACEHOLDER</h1>
//     <h1>WEBSOCKET PLACEHOLDER TO SET NOTIFICATIONS</h1>
//     </main>
//   );
// }

{/* <Routes>
  <Route
    path='/'
    element={
      <Login
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />
    }
    exact
  />
  // ...
</Routes> */}

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


export function Account({ userName, authState, onAuthChange }) {
  return (
    // <main className='container-fluid bg-secondary text-center'>
    <main className='account'>
      <div className='account-Header'>
        {authState !== AuthState.Unknown && <h1>Welcome to Soups Galore!</h1>}
        {authState === AuthState.Authenticated && <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
    
  );
}

// database placeholder
localStorage.setItem('userName', '');
const userName = localStorage.getItem('userName');

setInterval(() => {
  // This will be replaced with WebSocket messages
  const userName = `User-${Math.floor(Math.random() * 100)}`;
  displayPeerMessage({ msg: 'Hello', from: userName });
}, 1000);