import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import notificationService from "../services/notificationService";
import socketService from "../services/socketService";

const brand = { blue: "#18457A", green: "#16a34a", red: "#dc2626" };

function NotificationCard({ notification, onMarkAsRead, onDelete }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "new_course_available":
        return (
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📚</span>
          </div>
        );
      case "course_enrollment":
        return (
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">✅</span>
          </div>
        );
      case "payment_success":
        return (
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">💰</span>
          </div>
        );
      case "system_announcement":
        return (
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">⚙️</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🔔</span>
          </div>
        );
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "new_course_available": return "from-blue-50 to-cyan-50 border-blue-200";
      case "course_enrollment": return "from-green-50 to-emerald-50 border-green-200";
      case "payment_success": return "from-green-50 to-emerald-50 border-green-200";
      case "system_announcement": return "from-purple-50 to-pink-50 border-purple-200";
      default: return "from-gray-50 to-slate-50 border-gray-200";
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleMarkAsRead = async () => {
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification._id);
        onMarkAsRead(notification._id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await notificationService.deleteNotification(notification._id);
      onDelete(notification._id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getTypeColor(notification.type)} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${!notification.isRead ? 'border-l-4 border-l-blue-500 ring-2 ring-blue-100' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {getTypeIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-bold ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
              {notification.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full shadow-sm">
                {formatTime(notification.createdAt)}
              </span>
              <button
                onClick={handleDelete}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Delete notification"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{notification.message}</p>
          
          {notification.actionUrl && (
            <Link
              to={notification.actionUrl}
              className="inline-block text-sm text-blue-600 hover:text-blue-800 font-semibold bg-white px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:shadow-md mb-3"
              onClick={handleMarkAsRead}
            >
              {notification.actionText || 'View Details'}
            </Link>
          )}
          
          {!notification.isRead && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <button 
                onClick={handleMarkAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-white px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Mark as read
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Notifications() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  // Load notifications
  const loadNotifications = async (page = 1, type = null) => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (type && type !== 'all') {
        params.type = type;
      }
      
      const response = await notificationService.getNotifications(params);
      setNotifications(response.data.notifications);
      setPagination(response.data.pagination);
      setUnreadCount(response.data.pagination.unreadCount);
    } catch (error) {
      console.error('Error loading notifications:', error);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Load notification count
  const loadNotificationCount = async () => {
    try {
      const response = await notificationService.getNotificationCount();
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error loading notification count:', error);
    }
  };

  // Mark notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification._id === notificationId 
          ? { ...notification, isRead: true, readAt: new Date() }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Delete notification
  const handleDelete = (notificationId) => {
    setNotifications(prev => {
      const notification = prev.find(n => n._id === notificationId);
      const newNotifications = prev.filter(n => n._id !== notificationId);
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      return newNotifications;
    });
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true, readAt: new Date() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Handle new course notification from socket
  const handleNewCourseNotification = (notificationData) => {
    const newNotification = {
      _id: `temp_${Date.now()}`,
      type: notificationData.type,
      title: notificationData.title,
      message: notificationData.message,
      data: {
        courseId: notificationData.courseId,
        courseTitle: notificationData.courseTitle,
        courseThumbnail: notificationData.courseThumbnail
      },
      isRead: false,
      priority: notificationData.priority,
      actionUrl: notificationData.actionUrl,
      actionText: notificationData.actionText,
      createdAt: notificationData.timestamp
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Initialize socket connection and load data
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token) {
        // Connect to socket
        socketService.connect(token);
        
        // Listen for new course notifications
        socketService.onNewCourseNotification(handleNewCourseNotification);
      }
      
      // Load initial data
      loadNotifications();
      loadNotificationCount();
    }

    return () => {
      socketService.offNewCourseNotification();
    };
  }, [user]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadNotifications(1, tab);
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  if (loading && notifications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Notifications</h1>
          <p className="text-slate-600">
            Stay updated with your latest course activities and announcements
          </p>
          {unreadCount > 0 && (
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm text-slate-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-2 shadow-lg">
            {[
              { id: 'all', label: 'All', count: pagination.total },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'new_course_available', label: 'New Courses', count: notifications.filter(n => n.type === 'new_course_available').length },
              { id: 'course_enrollment', label: 'Enrollments', count: notifications.filter(n => n.type === 'course_enrollment').length },
              { id: 'payment_success', label: 'Payments', count: notifications.filter(n => n.type === 'payment_success').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label} {tab.count > 0 && `(${tab.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => loadNotifications()}
                className="mt-4 text-sm text-red-600 hover:text-red-800 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Try Again
              </button>
            </div>
          )}

          {filteredNotifications.length === 0 && !loading ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No notifications</h3>
              <p className="text-slate-600">
                {activeTab === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          )}

          {loading && notifications.length > 0 && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => loadNotifications(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    pagination.current === page
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}