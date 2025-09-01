// src/pages/SelectedCouse.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const brand = { blue: "#18457A", progress: "#1F4B7A", green: "#16a34a" };

export default function SelectedCourse() {
  const { id } = useParams();
  const progress = 60;

  const projects = useMemo(
    () => [
      "Turning Data into Decirous",
      "From Row Data to Executive Staries",
      "Design Beyond Cart",
      "The Art and Science of Dashbord",
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: brand.blue }}>
        Your Subscribe Courses
      </h1>

      {/* Course meta + progress */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-[1fr,320px] gap-8">
        {/* Left column */}
        <div>
          <p className="text-xl font-semibold text-slate-900 mt-2">Machine Learning Course (ID: {id})</p>
          <p className="text-sm text-slate-500 mt-1">Mentor Support - John Doe, IIT Kharagpur</p>

          {/* Progress bar with percent to the right */}
          <div className="mt-3 flex items-center gap-3">
            <div className="w-72 max-w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, background: brand.progress }} />
            </div>
            <span className="text-xs text-slate-600">{progress}%</span>
          </div>

          {/* Weekly Assessments */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-800">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" d="M4 6h16M4 12h10M4 18h6" />
              </svg>
              <span className="text-lg font-semibold">Weekly Assessments</span>
            </div>
            <button className="rounded-full border border-slate-400 px-3 py-1 text-xs hover:bg-slate-50">
              click Here
            </button>
          </div>

          {/* Projects list */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900">Projects:</h3>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
              {projects.map((p, i) => (
                <div key={i} className="text-sm text-slate-700">{p}</div>
              ))}
            </div>
          </div>

          {/* Resume button */}
          <div className="mt-8">
            <button className="w-96 max-w-full rounded-full border border-slate-400 py-2 text-sm font-medium hover:bg-slate-50">
              Resume Courses
            </button>
          </div>
        </div>

        {/* Right column: two cards + certificate */}
        <div className="space-y-8">
          {/* Card 1 */}
          <div>
            <div className="h-36 w-full rounded-xl bg-slate-200" />
            <div className="mt-2">
              <p className="text-xs font-semibold text-slate-900">Advance Machine Learning</p>
              <p className="text-[11px] text-slate-600">Drive deep into machine learning</p>
              <p className="text-[11px] text-slate-500 mt-1">By John Doe</p>
            </div>
          </div>

          {/* Card 2 (with small top-right icon placeholder) */}
          <div className="relative">
            <div className="h-28 w-full rounded-xl bg-slate-200" />
            <div className="absolute right-2 top-2 text-slate-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="mt-2 text-center text-sm text-slate-700">Unlock Your Certificate</p>
            <div className="mt-2 flex justify-center">
              <button
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
                style={{ background: brand.green }}
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
