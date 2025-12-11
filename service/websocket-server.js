// WebSocket Server Implementation for Soups Galore
// Add this to your service/index.js file

const { WebSocketServer } = require('ws');

// Store all connected clients
let connections = [];

function setupWebSocket(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Handle new WebSocket connections
  wss.on('connection', (ws) => {
    const connection = { id: connections.length + 1, alive: true, ws: ws };
    connections.push(connection);

    console.log(`New WebSocket connection established. Total connections: ${connections.length}`);

    // Send welcome message
    ws.send(JSON.stringify({ 
      type: 'connection', 
      message: 'Connected to Soups Galore WebSocket server',
      totalConnections: connections.length
    }));

    // Broadcast to all other clients that someone new joined
    broadcastToOthers(connection, {
      type: 'user-joined',
      message: 'A new soup enthusiast has joined!',
      totalConnections: connections.length
    });

    // Handle incoming messages from clients
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        console.log('Received WebSocket message:', message);

        // Handle different message types
        switch (message.type) {
          case 'recipe-favorited':
            // Broadcast when someone favorites a recipe
            broadcast({
              type: 'recipe-favorited',
              recipeName: message.recipeName,
              username: message.username || 'Anonymous',
              timestamp: new Date().toISOString()
            });
            break;

          case 'recipe-unfavorited':
            // Broadcast when someone unfavorites a recipe
            broadcast({
              type: 'recipe-unfavorited',
              recipeName: message.recipeName,
              username: message.username || 'Anonymous',
              timestamp: new Date().toISOString()
            });
            break;

          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Handle connection closure
    ws.on('close', () => {
      connections = connections.filter((c) => c !== connection);
      console.log(`WebSocket connection closed. Remaining connections: ${connections.length}`);
      
      // Broadcast to remaining clients
      broadcast({
        type: 'user-left',
        message: 'A soup enthusiast has left',
        totalConnections: connections.length
      });
    });

    // Handle pong responses for keep-alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep-alive ping interval (every 10 seconds)
  setInterval(() => {
    connections.forEach((connection) => {
      if (!connection.alive) {
        connection.ws.terminate();
        return;
      }
      connection.alive = false;
      connection.ws.ping();
    });
  }, 10000);
}

// Broadcast message to all connected clients
function broadcast(message) {
  connections.forEach((connection) => {
    if (connection.ws.readyState === 1) { // 1 = OPEN
      connection.ws.send(JSON.stringify(message));
    }
  });
}

// Broadcast to all clients except the sender
function broadcastToOthers(sender, message) {
  connections.forEach((connection) => {
    if (connection !== sender && connection.ws.readyState === 1) {
      connection.ws.send(JSON.stringify(message));
    }
  });
}

module.exports = { setupWebSocket };

