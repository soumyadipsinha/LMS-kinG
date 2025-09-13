import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Bell } from "lucide-react";
import LoginModal from "./LoginModal.jsx";
import SignupModal from "./SignupModal.jsx";
import Logo from "../assets/kinglogo.png";
import notificationService from "../services/notificationService";
import socketService from "../services/socketService";

const navLink = "uppercase text-lg font-bold text-slate-700 hover:text-[#1B4A8B] px-4 py-2";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to home after logout
  };

  // Load notification count and recent notifications
  useEffect(() => {
    if (user) {
      loadNotificationData();
      
      // Connect to socket for real-time notifications
      const token = localStorage.getItem('token');
      if (token) {
        socketService.connect(token);
        
        // Listen for new notifications
        socketService.onNewNotification((notificationData) => {
          // Add new notification to the list
          setRecentNotifications(prev => [notificationData, ...prev.slice(0, 4)]);
          setUnreadCount(prev => prev + 1);
        });
      }
    }

    return () => {
      socketService.offNewNotification();
    };
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationDropdown && !event.target.closest('.notification-dropdown')) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationDropdown]);

  const loadNotificationData = async () => {
    try {
      const [countResponse, notificationsResponse] = await Promise.all([
        notificationService.getNotificationCount(),
        notificationService.getNotifications({ limit: 5 })
      ]);
      
      setUnreadCount(countResponse.data.unreadCount || 0);
      setRecentNotifications(notificationsResponse.data.notifications || []);
    } catch (error) {
      console.error('Error loading notification data:', error);
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleNotificationItemClick = (notification) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    } else {
      navigate('/dashboard/notifications');
    }
    setShowNotificationDropdown(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_course_available':
        return '📚';
      case 'course_enrollment':
        return '✅';
      case 'payment_success':
        return '💰';
      case 'system_announcement':
        return '📢';
      default:
        return '🔔';
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-12 w-15 invert" />
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex gap-6">
              <NavLink to="/" end className={navLink}>Home</NavLink>
              <NavLink to="/courses" className={navLink}>Courses</NavLink>
              <NavLink to="/launchpad" className={navLink}>LaunchPad</NavLink>
              <NavLink to="/about" className={navLink}>About</NavLink>
              <NavLink to="/faq" className={navLink}>FAQ</NavLink>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="relative notification-dropdown">
                    <button 
                      onClick={handleNotificationClick}
                      className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Bell size={22} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotificationDropdown && (
                      <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                            <Link 
                              to="/dashboard/notifications"
                              className="text-sm text-blue-600 hover:text-blue-800"
                              onClick={() => setShowNotificationDropdown(false)}
                            >
                              View All
                            </Link>
                          </div>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                          {recentNotifications.length > 0 ? (
                            recentNotifications.map((notification) => (
                              <div
                                key={notification._id}
                                onClick={() => handleNotificationItemClick(notification)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                  !notification.isRead ? 'bg-blue-50' : ''
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatTime(notification.createdAt)}
                                    </p>
                                  </div>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center">
                              <div className="text-4xl mb-2">🔔</div>
                              <p className="text-gray-500 text-sm">No notifications yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative group">
                    <img
                      src={user.avatar || "https://i.pravatar.cc/200?img=8"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border cursor-pointer"
                      onClick={handleProfileClick}
                    />
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p className="px-4 py-2 text-gray-700 font-medium">{user.firstName || user.email?.split('@')[0]}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-slate-100 rounded transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* <Link
                    to="/admin/login"
                    className="rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold px-4 py-2.5 shadow"
                  >
                    👑 Admin
                  </Link> */}
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="rounded-full bg-[#1B4A8B] text-white text-sm font-semibold px-5 py-2.5 shadow"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
}
