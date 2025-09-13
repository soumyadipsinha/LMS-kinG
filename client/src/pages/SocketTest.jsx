import { useState, useEffect } from 'react';
import socketService from '../services/socketService';
import { useAuth } from '../context/AuthContext';

export default function SocketTest() {
  const { user } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token) {
        addLog('Attempting to connect to Socket.IO...');
        
        // Connect to socket
        const socket = socketService.connect(token);
        
        // Listen for connection events
        socket.on('connect', () => {
          setConnectionStatus('Connected');
          addLog('✅ Connected to server successfully');
        });
        
        socket.on('disconnect', () => {
          setConnectionStatus('Disconnected');
          addLog('❌ Disconnected from server');
        });
        
        socket.on('connect_error', (error) => {
          setConnectionStatus('Connection Error');
          addLog(`❌ Connection error: ${error.message}`);
        });
        
        // Test notification room
        socket.emit('join_notifications');
        addLog('📢 Attempted to join notifications room');
        
        // Listen for test notifications
        socket.on('new_course_notification', (data) => {
          addLog(`🔔 Received notification: ${data.title}`);
        });
        
        return () => {
          socketService.disconnect();
        };
      } else {
        addLog('❌ No authentication token found');
      }
    }
  }, [user]);

  const testConnection = () => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token) {
        addLog('🔄 Testing connection...');
        socketService.connect(token);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Socket.IO Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${
              connectionStatus === 'Connected' ? 'bg-green-500' : 
              connectionStatus === 'Connection Error' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <span className="font-medium">{connectionStatus}</span>
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Connection
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Connection Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
            {logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>1. Make sure you're logged in</li>
            <li>2. Check the connection status above</li>
            <li>3. Look for any error messages in the logs</li>
            <li>4. If connected, try creating a course as admin to test notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
