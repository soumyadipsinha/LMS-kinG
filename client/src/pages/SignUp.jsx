// src/pages/Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    try {
      // TODO: replace with API call to create user
      // Example:
      // await api.post("/signup", form)
      console.log("Sign up payload:", form);
      // On success, navigate to login or dashboard
      // navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-extrabold text-slate-900">Create account</h1>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Full name"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          minLength={8}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 text-white font-semibold px-4 py-2 hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="text-indigo-600 hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
