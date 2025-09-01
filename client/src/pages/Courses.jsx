// src/pages/Courses.jsx
import { Link } from "react-router-dom";

export default function Courses() {
  const categories = [
    "Web development",
    "Enterprise IT",
    "RectJS NextJS",
    "Javascript",
    "Backend Development",
  ];

  const courses = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "Advance Machine Learning",
    sub: "Drive deep into machine learning",
    author: "By John Doe",
    price: "$99.89",
  }));

  return (
    <div className="bg-white">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        {/* Promo banner */}
        <section className="rounded-3xl bg-[#E7EB6E] p-6 md:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            {/* Empty spacer left (for balanced layout like screenshot) */}
            <div className="hidden md:block" />
            {/* Copy block */}
            <div className="bg-white/90 rounded-lg p-5 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">
                Code your future
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Take control of a career. Learn the latest
                skills in web Development.
              </p>
            </div>
            {/* Illustration */}
            <div className="justify-self-end">
              <div className="w-40 h-40 md:w-48 md:h-48 grid place-items-center">
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="60" r="58" fill="#FFF7CC" />
                  <g fill="#111827">
                    <rect x="54" y="20" width="12" height="26" rx="2" />
                    <rect x="30" y="64" width="20" height="12" rx="2" />
                    <rect x="70" y="64" width="20" height="12" rx="2" />
                    <rect x="40" y="84" width="40" height="8" rx="2" />
                  </g>
                  <g fill="#4F46E5">
                    <rect x="22" y="30" width="16" height="10" rx="2" />
                    <rect x="82" y="30" width="16" height="10" rx="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Title */}
        <h1 className="mt-10 md:mt-12 text-3xl md:text-4xl font-extrabold text-slate-800">
          Our Courses
        </h1>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              className="px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-300 transition-colors"
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid of cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="group">
              <article className="cursor-pointer">
                {/* Image placeholder */}
                <div className="aspect-[16/11] w-full rounded-xl bg-slate-200 group-hover:bg-slate-300 transition-colors" />

                {/* Meta */}
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{course.sub}</p>
                  <p className="mt-1 text-xs text-slate-500">{course.author}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {course.price}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
