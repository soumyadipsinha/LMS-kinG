import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import adminNotificationService from '../services/adminNotificationService';

const AdminNotifications = () => {
  const { admin } = useAdminAuth();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'system_announcement',
    priority: 'medium',
    targetAudience: 'all', // all, enrolled, specific
    courseId: '',
    actionUrl: '',
    actionText: 'View Details'
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load courses for dropdown
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await adminNotificationService.getCourses();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await adminNotificationService.sendNotification({
        ...formData,
        adminName: `${admin.firstName} ${admin.lastName}`
      });

      setSuccess(`Notification sent successfully to ${response.data.recipientsCount} users!`);
      setFormData({
        title: '',
        message: '',
        type: 'system_announcement',
        priority: 'medium',
        targetAudience: 'all',
        courseId: '',
        actionUrl: '',
        actionText: 'View Details'
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      setError(error.response?.data?.message || 'Failed to send notification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'new_course_available':
        return '📚';
      case 'system_announcement':
        return '📢';
      case 'course_enrollment':
        return '✅';
      case 'payment_success':
        return '💰';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-blue-600 bg-blue-100';
      case 'low':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Send Notifications</h1>
          <p className="text-gray-600 mt-1">Send announcements and updates to students</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Admin: <span className="font-semibold text-gray-900">{admin.firstName} {admin.lastName}</span>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-green-600 text-lg mr-2">✅</span>
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 text-lg mr-2">❌</span>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Notification Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notification Type and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              >
                <option value="system_announcement">📢 System Announcement</option>
                <option value="new_course_available">📚 New Course Available</option>
                <option value="course_enrollment">✅ Course Enrollment</option>
                <option value="payment_success">💰 Payment Success</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🟠 High</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter notification title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter notification message..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <select
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            >
              <option value="all">👥 All Students</option>
              <option value="enrolled">📚 Enrolled Students Only</option>
              <option value="specific">🎯 Specific Course Students</option>
            </select>
          </div>

          {/* Course Selection (if specific course) */}
          {formData.targetAudience === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              >
                <option value="">Select a course...</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action URL and Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action URL (Optional)
              </label>
              <input
                type="url"
                name="actionUrl"
                value={formData.actionUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Button Text
              </label>
              <input
                type="text"
                name="actionText"
                value={formData.actionText}
                onChange={handleInputChange}
                placeholder="View Details"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview:</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">{getNotificationTypeIcon(formData.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{formData.title || 'Notification Title'}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(formData.priority)}`}>
                      {formData.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.message || 'Notification message will appear here...'}
                  </p>
                  {formData.actionUrl && (
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-white px-3 py-1 rounded-full shadow-sm">
                      {formData.actionText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>📤</span>
                  Send Notification
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setFormData({
              ...formData,
              title: 'New Course Available!',
              message: 'We have added a new course to our platform. Check it out and start learning today!',
              type: 'new_course_available',
              priority: 'high'
            })}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <span className="font-medium">New Course Announcement</span>
            </div>
            <p className="text-sm text-gray-600">Template for announcing new courses</p>
          </button>

          <button
            onClick={() => setFormData({
              ...formData,
              title: 'System Maintenance Notice',
              message: 'We will be performing scheduled maintenance on our platform. Some features may be temporarily unavailable.',
              type: 'system_announcement',
              priority: 'medium'
            })}
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">System Maintenance</span>
            </div>
            <p className="text-sm text-gray-600">Template for system announcements</p>
          </button>

          <button
            onClick={() => setFormData({
              ...formData,
              title: 'Welcome to Our Platform!',
              message: 'Thank you for joining us! Explore our courses and start your learning journey today.',
              type: 'system_announcement',
              priority: 'high'
            })}
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎉</span>
              <span className="font-medium">Welcome Message</span>
            </div>
            <p className="text-sm text-gray-600">Template for welcoming new students</p>
          </button>

          <button
            onClick={() => setFormData({
              ...formData,
              title: 'Course Update Available',
              message: 'New content has been added to one of your enrolled courses. Check it out now!',
              type: 'course_enrollment',
              priority: 'medium'
            })}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔄</span>
              <span className="font-medium">Course Update</span>
            </div>
            <p className="text-sm text-gray-600">Template for course updates</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
