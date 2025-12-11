// Notification Component for displaying real-time updates
// Save this as: src/components/Notifications.jsx

import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './Notifications.css'; // Optional: create this CSS file

export function Notifications() {
  const { notifications, isConnected, connectionCount } = useWebSocket();

  return (
    <div className="notifications-container">
      {/* Connection Status Badge */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <span className="status-dot"></span>
        <span className="status-text">
          {isConnected ? `${connectionCount} Online` : 'Offline'}
        </span>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            {notification.type === 'recipe-favorited' && (
              <div className="notification-content favorited">
                <span className="notification-icon">❤️</span>
                <span className="notification-text">
                  <strong>{notification.username}</strong> favorited{' '}
                  <em>{notification.recipeName}</em>
                </span>
              </div>
            )}
            {notification.type === 'recipe-unfavorited' && (
              <div className="notification-content unfavorited">
                <span className="notification-icon">💔</span>
                <span className="notification-text">
                  <strong>{notification.username}</strong> unfavorited{' '}
                  <em>{notification.recipeName}</em>
                </span>
              </div>
            )}
            {notification.type === 'user-joined' && (
              <div className="notification-content user-event">
                <span className="notification-icon">👋</span>
                <span className="notification-text">{notification.message}</span>
              </div>
            )}
            {notification.type === 'user-left' && (
              <div className="notification-content user-event">
                <span className="notification-icon">👋</span>
                <span className="notification-text">{notification.message}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}