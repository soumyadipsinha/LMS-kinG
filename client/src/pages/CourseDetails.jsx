import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { courseService } from "../services/courseService";

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
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);

  useEffect(() => {
    const existing = location.state?.course;
    if (existing) {
      setCourse(existing);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await courseService.getCourseById(id);
        const c = resp?.data?.course || resp?.data;
        if (!c) throw new Error("Course not found");
        setCourse(c);
      } catch (e) {
        setError(e.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, location.state]);

  // Load similar courses once the main course is available
  useEffect(() => {
    (async () => {
      if (!course?._id && !course?.id) return;
      try {
        const resp = await courseService.getCourses({
          limit: 6,
          category: course.category,
        });
        const items = resp?.data?.courses || [];
        const currentId = String(course._id || course.id);
        const filtered = items.filter(c => String(c._id) !== currentId).slice(0, 3);
        setSimilarCourses(filtered);
      } catch (e) {
        setSimilarCourses([]);
      }
    })();
  }, [course]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The course you're looking for doesn't exist or has been removed."}</p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center bg-[#1B4A8B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#153a6f] transition-colors duration-300"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const display = {
    id: course._id || course.id,
    title: course.title,
    description: course.description || course.shortDescription,
    thumbnail: course.thumbnail || "https://placehold.co/800x450?text=Course+Thumbnail",
    price: `₹${Number(course.price ?? 0).toLocaleString("en-IN")}`,
    level: course.level ? (course.level.charAt(0).toUpperCase() + course.level.slice(1)) : "Beginner",
    duration: `${course.duration || 0} hours`,
    students: course.enrollmentCount || 0,
    rating: course.rating?.average || 0,
    category: course.category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Other',
    instructor: `${course.instructor?.firstName || ''} ${course.instructor?.lastName || ''}`.trim() || 'Instructor',
    requirements: course.requirements || [],
    learningOutcomes: course.learningOutcomes || [],
    modules: course.modules || [],
  };

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-[#1B4A8B]">Home</Link></li>
            <li><span>/</span></li>
            <li><Link to="/courses" className="hover:text-[#1B4A8B]">Courses</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 font-medium">{display.title}</li>
          </ol>
        </nav>

        {/* Title and rating */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1b3b6b]">{display.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.floor(display.rating)} />
              ))}
            </div>
            <span className="text-sm font-semibold text-emerald-600">{display.rating}</span>
            <span className="text-xs text-slate-500">{display.students} students enrolled</span>
          </div>
        </div>

        {/* Overview + Right preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column */}
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Course Overview
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{display.description}</p>

            {display.learningOutcomes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">What you'll learn</h3>
                <ul className="list-disc ml-6 text-slate-700 space-y-1">
                  {display.learningOutcomes.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>
            )}

            {display.requirements.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Requirements</h3>
                <ul className="list-disc ml-6 text-slate-700 space-y-1">
                  {display.requirements.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-emerald-500">✅</span>
                <span className="text-slate-700">Real-time Corporate Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500">✅</span>
                <span className="text-slate-700">1:1 AI Mentorship & Mock Interviews</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500">✅</span>
                <span className="text-slate-700">Weekly Audits & Assessments</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500">✅</span>
                <span className="text-slate-700">Direct Referrals to Top MNCs</span>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="inline-flex items-center justify-center rounded-full bg-[#1b3b6b] text-white font-semibold px-6 py-2.5 shadow hover:bg-[#163257] transition-colors duration-300">
                Register Now
              </button>
            </div>
          </div>

          {/* Right preview card */}
          <aside>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg sticky top-6">
              <img src={display.thumbnail} alt={display.title} className="aspect-[16/10] w-full rounded-xl object-cover mb-4" />
              
              <div className="space-y-4">
                <div className="text-3xl font-bold text-[#1b3b6b]">{display.price}</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Level</div>
                    <div className="font-semibold">{display.level}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold">{display.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Category</div>
                    <div className="font-semibold">{display.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Instructor</div>
                    <div className="font-semibold">{display.instructor}</div>
                  </div>
                </div>
                
                <button className="w-full bg-[#1b3b6b] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#163257] transition-colors duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Courses */}
        {similarCourses.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCourses.map((c) => (
                <Link key={c._id} to={`/courses/${c._id}`} className="group">
                  <article className="cursor-pointer rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                    <img
                      src={c.thumbnail || "https://placehold.co/600x400?text=Course"}
                      alt={c.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#1b3b6b] transition-colors duration-300">{c.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{c.shortDescription || c.description}</p>
                      <p className="mt-1 text-xs text-slate-500">{`${c.instructor?.firstName ?? ''} ${c.instructor?.lastName ?? ''}`.trim()}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">₹{Number(c.price ?? 0).toLocaleString('en-IN')}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
