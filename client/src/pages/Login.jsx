// src/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to dashboard after login
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-extrabold text-slate-900">Login</h1>
      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          type="password"
          name="password"
        />
        <button className="w-full rounded-lg bg-indigo-600 text-white font-semibold px-4 py-2 hover:bg-indigo-700">
          Sign in
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        New user?{" "}
        <Link className="text-indigo-600 hover:underline" to="/signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}
