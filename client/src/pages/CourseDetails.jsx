import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  
  // Dummy course data - in a real app, this would come from an API
  const allCourses = [
    { 
      id: 1, 
      title: "Advanced Machine Learning", 
      sub: "Dive deep into machine learning algorithms and neural networks", 
      author: "By Dr. John Doe", 
      price: "₹7,999", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      level: "Advanced",
      duration: "8 weeks",
      students: 1247,
      rating: 4.8,
      category: "Machine Learning",
      description: "This comprehensive course covers everything from basic machine learning concepts to advanced neural network architectures. You'll learn to build, train, and deploy ML models for real-world applications."
    },
    { 
      id: 2, 
      title: "React for Beginners", 
      sub: "Learn React from scratch with hands-on projects", 
      author: "By Jane Smith", 
      price: "₹5,999", 
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      level: "Beginner",
      duration: "6 weeks",
      students: 2156,
      rating: 4.9,
      category: "Web Development",
      description: "Start your React journey with this beginner-friendly course. Learn component-based architecture, hooks, state management, and build real projects from scratch."
    },
    { 
      id: 3, 
      title: "Node.js & Express Mastery", 
      sub: "Build scalable backend APIs with Node.js and Express", 
      author: "By Mike Johnson", 
      price: "₹6,999", 
      img: "https://images.unsplash.com/photo-1555066931-4365d308bab7?w=400&h=250&fit=crop",
      level: "Intermediate",
      duration: "7 weeks",
      students: 1893,
      rating: 4.7,
      category: "Web Development",
      description: "Master backend development with Node.js and Express. Learn to build RESTful APIs, handle authentication, work with databases, and deploy your applications."
    },
    { 
      id: 4, 
      title: "Next.js & Server-Side Rendering", 
      sub: "Master modern React with Next.js and SSR", 
      author: "By Sarah Lee", 
      price: "₹8,999", 
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      level: "Intermediate",
      duration: "6 weeks",
      students: 1567,
      rating: 4.8,
      category: "Web Development",
      description: "Take your React skills to the next level with Next.js. Learn server-side rendering, static generation, API routes, and build production-ready applications."
    },
    { 
      id: 5, 
      title: "Full Stack Web Development", 
      sub: "Complete web development from frontend to backend", 
      author: "By David Kim", 
      price: "₹9,999", 
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      level: "Advanced",
      duration: "10 weeks",
      students: 2341,
      rating: 4.9,
      category: "Web Development",
      description: "Become a full-stack developer with this comprehensive course. Cover frontend, backend, databases, deployment, and build complete web applications."
    },
    { 
      id: 6, 
      title: "JavaScript Deep Dive", 
      sub: "Master JavaScript fundamentals and modern ES6+ features", 
      author: "By Emily Clark", 
      price: "₹4,999", 
      img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      level: "Beginner",
      duration: "5 weeks",
      students: 3124,
      rating: 4.6,
      category: "Web Development",
      description: "Build a solid foundation in JavaScript with this comprehensive course. Learn ES6+ features, async programming, and modern JavaScript patterns."
    }
  ];

  // Try to get course from location state first, then find by ID
  let course = location.state?.course;
  if (!course) {
    course = allCourses.find(c => c.id === parseInt(id));
  }

  if (!course) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
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

  // Different similar courses with unique data
  const similar = allCourses.filter(c => c.id !== course.id).slice(0, 3);

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
            <li className="text-gray-900 font-medium">{course.title}</li>
          </ol>
        </nav>

        {/* Title and rating */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1b3b6b]">
            {course.title}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.floor(course.rating)} />
              ))}
            </div>
            <span className="text-sm font-semibold text-emerald-600">{course.rating}</span>
            <span className="text-xs text-slate-500">{course.students} students enrolled</span>
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
              {course.description}
            </p>
            
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
              <img
                src={course.img}
                alt={course.title}
                className="aspect-[16/10] w-full rounded-xl object-cover mb-4"
              />
              
              <div className="space-y-4">
                <div className="text-3xl font-bold text-[#1b3b6b]">{course.price}</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Level</div>
                    <div className="font-semibold">{course.level}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Category</div>
                    <div className="font-semibold">{course.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Instructor</div>
                    <div className="font-semibold">{course.author}</div>
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
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similar.map((similarCourse) => (
              <Link
                key={similarCourse.id}
                to={`/courses/${similarCourse.id}`}
                className="group"
              >
                <article className="cursor-pointer rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <img
                    src={similarCourse.img}
                    alt={similarCourse.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#1b3b6b] transition-colors duration-300">
                      {similarCourse.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{similarCourse.sub}</p>
                    <p className="mt-1 text-xs text-slate-500">{similarCourse.author}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{similarCourse.price}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
