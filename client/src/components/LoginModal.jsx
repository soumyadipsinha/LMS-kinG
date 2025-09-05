// src/components/LoginModal.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Logged in successfully!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSwitchToSignup = () => {
    onSwitchToSignup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-sm">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">🔐</span>
              </div>
              <div>
                <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <span className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? "Signing in..." : "🚀 Sign In"}
            </button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-2.5 px-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105">
              <span className="text-lg">🔍</span>
              Google
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={handleSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
