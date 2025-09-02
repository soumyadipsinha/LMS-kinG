// src/components/SignupModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Here you would typically validate and create the account
    // For now, we'll just navigate to dashboard
    navigate("/dashboard");
    onClose(); // Close the modal
  };

  const handleClose = () => {
    onClose();
  };

  const handleSwitchToLogin = () => {
    onSwitchToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Main modal container */}
      <div className="relative w-full max-w-sm">
        {/* Floating signup card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <h2 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Join Us
                </h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300"
                placeholder="Create password"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300"
                placeholder="Confirm password"
                required
              />
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start text-xs">
              <input 
                type="checkbox" 
                className="mt-0.5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50" 
                required
              />
              <label className="ml-2 text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                  Privacy
                </Link>
              </label>
            </div>

            {/* Signup button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🚀 Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social signup options */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-2.5 px-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105">
              <span className="text-lg">🔍</span>
              Google
            </button>
          </div>

          {/* Login link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={handleSwitchToLogin}
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-300"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
