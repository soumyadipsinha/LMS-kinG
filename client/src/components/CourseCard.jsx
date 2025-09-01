// src/components/CourseCard.jsx
import { Link } from "react-router-dom";

export default function CourseCard({ imgSrc, title, level, desc, id }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image Section */}
      {imgSrc && (
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
      )}

      {/* Content Section */}
      <div className="p-5">
        <div className="text-sm font-semibold text-indigo-600">{level}</div>
        <h3 className="mt-2 text-lg font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600 text-sm">{desc}</p>
        <Link to={`/courses/${id}`}>
          <button className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-semibold px-4 py-2 hover:bg-indigo-700">
            View Course
          </button>
        </Link>
      </div>
    </div>
  );
}
