// src/pages/Subscription.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseCard({ id, title, author, progress }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/selected-course/${id}`);
  };

  return (
    <div 
      className="bg-white border rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="w-full h-36 bg-slate-200 rounded-lg mb-3" />
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
        Drive deep into machine learning
      </p>
      <p className="text-xs text-indigo-600 mt-1">By {author}</p>

      <div className="mt-3">
        <div className="h-1.5 w-full rounded bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-[#1F509B]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-end text-xs text-slate-600 mt-1">{progress}%</div>
      </div>
    </div>
  );
}

export default function Subscription() {
  const [query, setQuery] = useState("");
  const courses = [
    { id: 1, title: "Advance Machine Learning", author: "John Doe", progress: 60 },
    { id: 2, title: "Advance Machine Learning", author: "John Doe", progress: 60 },
    { id: 3, title: "Another Course", author: "Jane Smith", progress: 35 },
  ];

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F4B7A]">
          Your Subscribe Courses
        </h1>

        <div className="relative w-72">
          <input
            className="w-full rounded-full border border-[#1F4B7A] pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F4B7A]"
            placeholder="Search Course"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-[#1F4B7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {filtered.map((c) => (
          <CourseCard key={c.id} id={c.id} title={c.title} author={c.author} progress={c.progress} />
        ))}
      </div>
    </section>
  );
}
