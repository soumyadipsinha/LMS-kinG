// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

const navLink =
  "uppercase text-lg font-bold tracking-wide text-slate-700 hover:text-[#1B4A8B] transition-colors px-4 py-2";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-wide text-[#1B4A8B]">
              LITERA
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLink}>
              Home
            </NavLink>
            <NavLink to="/courses" className={navLink}>
              Courses
            </NavLink>
            <NavLink to="/about" className={navLink}>
              About
            </NavLink>
            <NavLink to="/faq" className={navLink}>
              FAQ
            </NavLink>
          </nav>

          {/* Login + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#1B4A8B] text-white text-sm font-semibold px-5 py-2.5 shadow hover:bg-indigo-700"
            >
              Login
            </Link>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-300 text-slate-700">
              <span className="sr-only">Menu</span>
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
