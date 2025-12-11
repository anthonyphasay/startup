# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

I added new notes! 
## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## WebSocket Implementation

Implemented full WebSocket support for real-time notifications. This was incredibly rewarding to see the live updates working!

### Backend WebSocket Server

- Installed the `ws` library for WebSocket support on the backend
- Created a WebSocket server in service/index.js that upgrades HTTP connections
- Implemented connection management using a Map to track all connected clients
- Added a broadcast function that sends messages to all connected clients
- Integrated WebSocket notifications with the favorites API - when a user favorites a recipe, all connected clients receive a real-time notification

Key learnings:
- WebSocket servers need to handle the HTTP upgrade protocol
- The `noServer: true` option allows the WebSocket server to share the same HTTP server instance
- Connection state management is crucial - need to track which clients are connected and remove them on disconnect

```javascript
// WebSocket Server Setup
const wss = new WebSocketServer({ noServer: true });
const connections = new Map();

wss.on('connection', (ws) => {
  const connectionId = uuid();
  connections.set(connectionId, ws);

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Handle messages
  });

  ws.on('close', () => {
    connections.delete(connectionId);
  });
});

// Handle upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
```

### Frontend WebSocket Client

- Created a WebSocketService class (src/services/websocket.js) to manage the WebSocket connection
- Implemented automatic reconnection with exponential backoff
- Built an event listener system to handle different message types
- Used React hooks to connect WebSocket to the UI and display real-time notifications

Key learnings:
- WebSocket URLs use `ws://` (or `wss://` for secure) protocol instead of `http://`
- In development, need to connect directly to the backend port (4000)
- In production, can use the same host as the web page
- Automatic reconnection is essential for a robust real-time experience
- React's useEffect cleanup function is perfect for managing WebSocket lifecycle

```javascript
// WebSocket connection with auto-reconnect
connect() {
  const wsUrl = import.meta.env.DEV
    ? `ws://localhost:4000`
    : `${protocol}//${host}`;

  this.ws = new WebSocket(wsUrl);

  this.ws.onclose = () => {
    this.scheduleReconnect();
  };
}
```

### Vite Configuration

- Configured vite.config.js to proxy WebSocket requests during development
- Added `/ws` proxy with `ws: true` option to enable WebSocket protocol handling
- This allows the dev server to forward WebSocket connections to the backend

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/ws': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
});
```

### UI Integration

- Used React Bootstrap Toast components to display notifications
- Implemented automatic notification dismissal after 5 seconds
- Added visual indicator for WebSocket connection status
- Notifications appear when users favorite recipes in real-time

The coolest part was seeing multiple browser windows receive notifications when one user favorites a recipe. It really brings the app to life!
