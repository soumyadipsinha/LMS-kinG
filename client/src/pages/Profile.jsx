// src/pages/Profile.jsx
import { useState } from "react";

const brand = { blue: "#18457A" };

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "Sanchari",
    lastName: "Ghosh",
    email: "gsanchari9870@gmail.com",
    countryCode: "+91",
    phone: "9647762617",
    password: "*******************",
    github: "",
    linkedin: "",
    website: "",
    youtube: "",
    resume: ""
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: brand.blue }}>Your Profile</h1>
          <p className="text-[12px] text-slate-500 mt-1">Information About Your Self</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm hover:bg-slate-50">
            <span>View Profile</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm hover:bg-slate-50">
            <span>EDIT</span>
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 rounded-xl bg-white shadow-sm border border-slate-200">
        <div className="p-6 md:p-8">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className="mt-2 w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                className="mt-2 w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-800">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="mt-2 w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-800">Phone No.</label>
            <div className="mt-2 flex items-center gap-2">
              <input
                name="countryCode"
                value={form.countryCode}
                onChange={onChange}
                className="w-24 rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="flex-1 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-800">Password</label>
            <div className="mt-2 relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                  <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-800">Links</p>

            <div className="mt-3 space-y-4">
              <input
                placeholder="GitHub Link |"
                name="github"
                value={form.github}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="LinkedIn Link |"
                name="linkedin"
                value={form.linkedin}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="Website Link |"
                name="website"
                value={form.website}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="Youtube Link |"
                name="youtube"
                value={form.youtube}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {/* New: Resume / Project Link */}
              <input
                placeholder="Resume / Project Link |"
                name="resume"
                value={form.resume}
                onChange={onChange}
                className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
