// src/pages/CourseDetails.jsx
import { Link, useParams } from "react-router-dom";

function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-5 h-5 ${filled ? "text-emerald-500" : "text-slate-300"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1.175 0l-2.935 2.136c-.784.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.75 8.72c-.783-.57-.379-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  );
}

export default function CourseDetails() {
  const { id } = useParams();
  
  // In a real app these would come from route params / API
  const course = {
    id: id,
    title: "Machine Learning Course",
    name: "Advance Machine Learning",
    sub: "Drive deep into machine learning",
    author: "By John Doe",
    price: "$99.89",
  };

  const similar = Array.from({ length: 3 }).map((_, i) => ({
    id: i + 1,
    title: "Advance Machine Learning",
    sub: "Drive deep into machine learning",
    author: "By John Doe",
    price: "$99.89",
  }));

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        {/* Title and rating */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1b3b6b]">
            {course.title}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              <Star filled />
              <Star filled />
              <Star filled />
              <Star filled />
              <Star filled={false} />
            </div>
            <span className="text-sm font-semibold text-emerald-600">4.5</span>
            <span className="text-xs text-slate-500">2 Reviews</span>
          </div>
        </div>

        {/* Overview + Right preview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left column */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Course Overview
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Learn fundamental and advanced machine learning concepts with
              hands-on projects. Build, evaluate, and deploy models for real
              datasets while mastering workflows used in production ML.
            </p>

            <div className="mt-8">
              <button className="inline-flex items-center justify-center rounded-full bg-[#1b3b6b] text-white font-semibold px-6 py-2.5 shadow hover:bg-[#163257]">
                Book Now
              </button>
            </div>
          </div>

          {/* Right preview card */}
          <aside>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="aspect-[16/10] w-full rounded-xl bg-slate-200" />
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  {course.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{course.sub}</p>
                <p className="mt-1 text-xs text-slate-500">{course.author}</p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {course.price}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Course */}
        <h2 className="mt-12 text-2xl md:text-3xl font-extrabold text-[#1b3b6b]">
          Similar Course
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {similar.map((c) => (
            <Link key={c.id} to={`/courses/${c.id}`} className="group">
              <div className="aspect-[16/11] w-full rounded-xl bg-slate-200 group-hover:bg-slate-300 transition-colors" />
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{c.sub}</p>
                <p className="mt-1 text-xs text-slate-500">{c.author}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {c.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
