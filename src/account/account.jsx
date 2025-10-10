import React from 'react';

export function Account() {
  return (
    <main className="world-info">
            <h2>Login</h2>
            <label for="first">Username:</label>
<input type="text" id="first" name="first" 
    placeholder="Enter your Username" required />

<label for="password">Password:</label>
<input type="password" id="password" name="password" 
    placeholder="Enter your Password" required />
    <button type="submit"> Submit </button>
    <br />
    <br />
    <h1>DATABASE PLACEHOLDER</h1>
    <h1>WEBSOCKET PLACEHOLDER TO SET NOTIFICATIONS</h1>
    </main>
  );
}