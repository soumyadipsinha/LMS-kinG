// src/pages/Notifications.jsx
import { useState } from "react";

const brand = { blue: "#18457A", green: "#16a34a", red: "#dc2626" };

function NotificationCard({ title, message, time, type, isRead }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "course":
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "payment":
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case "system":
        return (
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2z" />
          </svg>
        );
    }
  };

  return (
    <div className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${!isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {getTypeIcon(type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold ${!isRead ? 'text-slate-900' : 'text-slate-700'}`}>
              {title}
            </h3>
            <span className="text-xs text-slate-500">{time}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{message}</p>
          {!isRead && (
            <div className="mt-3">
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Mark as read
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationPreference({ title, description, enabled, onToggle }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseUpdates: true,
    paymentReminders: true,
    marketingEmails: false,
  });

  const notifications = [
    {
      id: 1,
      title: "New Course Available",
      message: "Advanced Machine Learning course is now available for enrollment.",
      time: "2 hours ago",
      type: "course",
      isRead: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Your payment of $99.89 for Machine Learning Course has been processed successfully.",
      time: "1 day ago",
      type: "payment",
      isRead: true,
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur on December 20th from 2-4 AM EST.",
      time: "2 days ago",
      type: "system",
      isRead: true,
    },
    {
      id: 4,
      title: "Course Progress Update",
      message: "You've completed 60% of the Machine Learning course. Keep up the great work!",
      time: "3 days ago",
      type: "course",
      isRead: false,
    },
  ];

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: brand.blue }}>
            Notifications
          </h1>
          <p className="text-[12px] text-slate-500 mt-1">Manage your notification preferences and view recent updates</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Mark All as Read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "all" 
              ? "border-blue-500 text-blue-600" 
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Notifications
        </button>
        <button
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "course" 
              ? "border-blue-500 text-blue-600" 
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setActiveTab("course")}
        >
          Course Updates
        </button>
        <button
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "payment" 
              ? "border-blue-500 text-blue-600" 
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Payment Alerts
        </button>
        <button
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "system" 
              ? "border-blue-500 text-blue-600" 
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setActiveTab("system")}
        >
          System Notifications
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} {...notification} />
            ))}
          </div>
        </div>

        {/* Preferences Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <NotificationPreference
              title="Email Notifications"
              description="Receive notifications via email"
              enabled={preferences.emailNotifications}
              onToggle={() => togglePreference('emailNotifications')}
            />
            <NotificationPreference
              title="Push Notifications"
              description="Receive push notifications in browser"
              enabled={preferences.pushNotifications}
              onToggle={() => togglePreference('pushNotifications')}
            />
            <NotificationPreference
              title="Course Updates"
              description="Get notified about new courses and updates"
              enabled={preferences.courseUpdates}
              onToggle={() => togglePreference('courseUpdates')}
            />
            <NotificationPreference
              title="Payment Reminders"
              description="Receive payment due reminders"
              enabled={preferences.paymentReminders}
              onToggle={() => togglePreference('paymentReminders')}
            />
            <NotificationPreference
              title="Marketing Emails"
              description="Receive promotional and marketing emails"
              enabled={preferences.marketingEmails}
              onToggle={() => togglePreference('marketingEmails')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
