// src/pages/Login.jsx
export default function Login() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-extrabold text-slate-900">Login</h1>
      <form className="mt-6 space-y-4">
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
        />
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          type="password"
        />
        <button className="w-full rounded-lg bg-indigo-600 text-white font-semibold px-4 py-2 hover:bg-indigo-700">
          Sign in
        </button>
      </form>
    </div>
  );
}
