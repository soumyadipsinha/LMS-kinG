import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate admin authentication
    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "admin123") {
        localStorage.setItem("adminToken", "dummy-admin-token");
        localStorage.setItem("adminUser", JSON.stringify({
          username: "admin",
          role: "super-admin",
          name: "Administrator"
        }));
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials! Use: admin/admin123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Main admin login container */}
      <div className="relative w-full max-w-md">
        {/* Floating admin login card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">👑</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-600 mt-2">Access administrative controls</p>
          </div>

          {/* Admin login form */}
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Admin Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all duration-300"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Admin Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all duration-300"
                placeholder="Enter admin password"
                required
              />
            </div>

            {/* Admin login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "🔐 Authenticating..." : "👑 Admin Login"}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">Demo Credentials:</h3>
            <p className="text-xs text-amber-700">
              <strong>Username:</strong> admin<br/>
              <strong>Password:</strong> admin123
            </p>
          </div>

          {/* Back to main site */}
          <p className="mt-6 text-center text-sm text-gray-600">
            <a
              href="/"
              className="text-red-600 hover:text-red-700 font-semibold hover:underline transition-colors duration-300"
            >
              ← Back to Main Site
            </a>
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-60 animate-pulse-float"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-60 animate-pulse-float animation-delay-1000"></div>
      </div>
    </div>
  );
}
