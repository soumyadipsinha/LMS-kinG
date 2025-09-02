// src/pages/Profile.jsx
import { useState } from "react";

const brand = { blue: "#18457A" };

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "Sanchari",
    lastName: "Ghosh",
    email: "sanchari76@gmail.com",
    countryCode: "+91",
    phone: "9876543450",
    password: "*******************",
    github: "",
    linkedin: "",
    website: "",
    youtube: "",
    resume: ""
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-8 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      {/* Header row */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">👤</div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Profile
            </h1>
          </div>
          <p className="text-[12px] text-slate-500 mt-1">Information About Your Self</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 text-sm hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 shadow-sm">
            <span className="font-medium text-indigo-700">👁️ View Profile</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 text-sm hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 shadow-sm">
            <span className="font-medium text-blue-700">✏️ EDIT</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 text-sm hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-sm">
            <span className="font-medium text-green-700">🎓 Education</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2 text-sm hover:from-orange-100 hover:to-red-100 transition-all duration-300 shadow-sm">
            <span className="font-medium text-orange-700">💳 Payment</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 text-sm hover:from-purple-100 hover:to-pink-100 transition-all duration-300 shadow-sm">
            <span className="font-medium text-purple-700">📋 Project Info</span>
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl bg-white shadow-xl border-2 border-gradient-to-r from-indigo-100 to-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <span className="text-2xl">📝</span>
            Personal Information
          </h2>
        </div>
        <div className="p-6 md:p-8">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-indigo-600">👤</span>
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className="w-full rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-300 group-hover:border-indigo-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-indigo-600">👤</span>
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                className="w-full rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-300 group-hover:border-indigo-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-6 group">
            <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="text-green-600">📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-300 group-hover:border-green-300"
            />
          </div>

          {/* Phone */}
          <div className="mt-6 group">
            <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="text-blue-600">📱</span>
              Phone No.
            </label>
            <div className="flex items-center gap-2">
              <input
                name="countryCode"
                value={form.countryCode}
                onChange={onChange}
                className="w-24 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 group-hover:border-blue-300"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="flex-1 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 group-hover:border-blue-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6 group">
            <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="text-red-600">🔒</span>
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className="w-full rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all duration-300 group-hover:border-red-300"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                  <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-purple-800 flex items-center gap-2">
                <span className="text-xl">🔗</span>
                Social Links & Portfolio
              </p>
            </div>

            <div className="space-y-4">
              <div className="group">
                <input
                  placeholder="GitHub Link |"
                  name="github"
                  value={form.github}
                  onChange={onChange}
                  className="w-full rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all duration-300 group-hover:border-gray-300"
                />
              </div>
              <div className="group">
                <input
                  placeholder="LinkedIn Link |"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={onChange}
                  className="w-full rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 group-hover:border-blue-300"
                />
              </div>
              <div className="group">
                <input
                  placeholder="Website Link |"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  className="w-full rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-300 group-hover:border-green-300"
                />
              </div>
              <div className="group">
                <input
                  placeholder="Youtube Link |"
                  name="youtube"
                  value={form.youtube}
                  onChange={onChange}
                  className="w-full rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all duration-300 group-hover:border-red-300"
                />
              </div>
              <div className="group">
                <input
                  placeholder="Resume / Project Link |"
                  name="resume"
                  value={form.resume}
                  onChange={onChange}
                  className="w-full rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 group-hover:border-purple-300"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
