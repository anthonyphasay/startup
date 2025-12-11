// WebSocket Hook for Frontend
// Save this as: src/hooks/useWebSocket.jsx

import { useEffect, useState, useRef } from 'react';

export function useWebSocket() {
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    // Determine WebSocket URL based on environment
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    console.log('Connecting to WebSocket:', wsUrl);

    // Create WebSocket connection
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    // Connection opened
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received:', message);

        // Update connection count
        if (message.totalConnections !== undefined) {
          setConnectionCount(message.totalConnections);
        }

        // Add notification for recipe favoriting events
        if (message.type === 'recipe-favorited' || message.type === 'recipe-unfavorited') {
          const notification = {
            id: Date.now(),
            ...message
          };
          
          setNotifications(prev => [notification, ...prev].slice(0, 10)); // Keep last 10

          // Auto-remove notification after 5 seconds
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notification.id));
          }, 5000);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Connection closed
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    });

    // Connection error
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  // Function to send messages through WebSocket
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  // Function to notify when user favorites a recipe
  const notifyRecipeFavorited = (recipeName, username) => {
    sendMessage({
      type: 'recipe-favorited',
      recipeName,
      username
    });
  };

  // Function to notify when user unfavorites a recipe
  const notifyRecipeUnfavorited = (recipeName, username) => {
    sendMessage({
      type: 'recipe-unfavorited',
      recipeName,
      username
    });
  };

  return {
    notifications,
    isConnected,
    connectionCount,
    notifyRecipeFavorited,
    notifyRecipeUnfavorited,
    sendMessage
  };
}