import { useLocation, useParams } from "react-router-dom";

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
  const location = useLocation();
  const { course } = location.state || {}; // get course object from state

  if (!course) {
    return <p className="text-center mt-20">Course not found.</p>;
  }

  const similar = Array.from({ length: 3 }).map((_, i) => ({
    ...course, // just showing same course for simplicity
    id: i + 10,
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
            <h2 className="text-3xl font-semibold text-slate-900">
              Course Overview
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              <span className="font-bold">Real-time Corporate Projects:</span> Gain hands-on experience during your course.<br/>
              <span className="font-bold">1:1 AI Mentorship & Mock Interviews:</span> Personalised support and MNC scenario<br/>
              <span className="font-bold">Weekly Audits & Assessments:</span> Track progress and unlock certifications regularly.<br/>
              <span className="font-bold">Direct Referrals to Top MNCs:</span> Opportunities for potential salaries up to ₹20 LPA.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center justify-center rounded-full bg-[#1b3b6b] text-white font-semibold px-6 py-2.5 shadow hover:bg-[#163257]">
                Register Now
              </button>
            </div>
          </div>

          {/* Right preview card */}
          <aside>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <img
                src={course.img}
                alt={course.title}
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  {course.title}
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

        {/* Similar Courses */}
        <h2 className="mt-12 text-2xl md:text-3xl font-extrabold text-[#1b3b6b]">
          Similar Courses
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {similar.map((c) => (
            <div key={c.id} className="group">
              <img
                src={c.img}
                alt={c.title}
                className="aspect-[16/11] w-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-slate-800">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.sub}</p>
                <p className="mt-1 text-xs text-slate-500">{c.author}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{c.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
