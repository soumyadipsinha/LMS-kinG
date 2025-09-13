import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    // Extract base URL without /api suffix
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const serverUrl = apiUrl.replace('/api', '');
    
    this.socket = io(serverUrl, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to server');
      this.isConnected = true;
      
      // Join notifications room
      this.socket.emit('join_notifications');
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Connection error:', error);
      console.error('🔌 Error details:', {
        message: error.message,
        type: error.type,
        description: error.description
      });
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('leave_notifications');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Listen for new course notifications
  onNewCourseNotification(callback) {
    if (this.socket) {
      this.socket.on('new_course_notification', callback);
      this.listeners.set('new_course_notification', callback);
    }
  }

  // Listen for new notifications
  onNewNotification(callback) {
    if (this.socket) {
      this.socket.on('new_notification', callback);
      this.listeners.set('new_notification', callback);
    }
  }

  // Remove specific listener
  offNewCourseNotification() {
    if (this.socket) {
      const callback = this.listeners.get('new_course_notification');
      if (callback) {
        this.socket.off('new_course_notification', callback);
        this.listeners.delete('new_course_notification');
      }
    }
  }

  // Remove new notification listener
  offNewNotification() {
    if (this.socket) {
      const callback = this.listeners.get('new_notification');
      if (callback) {
        this.socket.off('new_notification', callback);
        this.listeners.delete('new_notification');
      }
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.listeners.forEach((callback, event) => {
        this.socket.off(event, callback);
      });
      this.listeners.clear();
    }
  }

  // Get connection status
  getConnectionStatus() {
    return this.isConnected;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
