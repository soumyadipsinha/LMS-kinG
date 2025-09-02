import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AiPic from "../assets/Ai-pic.jpg";
import ReactPic from "../assets/react-pic.jpg";
import NodePic from "../assets/Node-pic.jpg";
import NextJSPic from "../assets/nextjs-pic.jpg";
import FullStackPic from "../assets/FullStack-pic.jpg";
import JSDeepPic from "../assets/javascript-pic.jpg";
import courses1 from "../assets/courses1.jpg";
import courses2 from "../assets/courses2.jpg";
import courses3 from "../assets/courses3.jpg";
import courses4 from "../assets/courses4.jpg";
import courses5 from "../assets/courses5.jpg";

export default function Courses() {
  const categories = [
    "All Courses",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile Development",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity"
  ];

  const courses = [
    { 
      id: 1, 
      title: "Advanced Machine Learning", 
      sub: "Dive deep into machine learning algorithms and neural networks", 
      author: "By Dr. John Doe", 
      price: "₹7,999", 
      img: AiPic,
      level: "Advanced",
      duration: "8 weeks",
      students: 1247,
      rating: 4.8,
      category: "Machine Learning"
    },
    { 
      id: 2, 
      title: "React for Beginners", 
      sub: "Learn React from scratch with hands-on projects", 
      author: "By Jane Smith", 
      price: "₹5,999", 
      img: ReactPic,
      level: "Beginner",
      duration: "6 weeks",
      students: 2156,
      rating: 4.9,
      category: "Web Development"
    },
    { 
      id: 3, 
      title: "Node.js & Express Mastery", 
      sub: "Build scalable backend APIs with Node.js and Express", 
      author: "By Mike Johnson", 
      price: "₹6,999", 
      img: NodePic,
      level: "Intermediate",
      duration: "7 weeks",
      students: 1893,
      rating: 4.7,
      category: "Web Development"
    },
    { 
      id: 4, 
      title: "Next.js & Server-Side Rendering", 
      sub: "Master modern React with Next.js and SSR", 
      author: "By Sarah Lee", 
      price: "₹8,999", 
      img: NextJSPic,
      level: "Intermediate",
      duration: "6 weeks",
      students: 1567,
      rating: 4.8,
      category: "Web Development"
    },
    { 
      id: 5, 
      title: "Full Stack Web Development", 
      sub: "Complete web development from frontend to backend", 
      author: "By David Kim", 
      price: "₹9,999", 
      img: FullStackPic,
      level: "Advanced",
      duration: "10 weeks",
      students: 2341,
      rating: 4.9,
      category: "Web Development"
    },
    { 
      id: 6, 
      title: "JavaScript Deep Dive", 
      sub: "Master JavaScript fundamentals and modern ES6+ features", 
      author: "By Emily Clark", 
      price: "₹4,999", 
      img: JSDeepPic,
      level: "Beginner",
      duration: "5 weeks",
      students: 3124,
      rating: 4.6,
      category: "Web Development"
    },
    { 
      id: 7, 
      title: "Data Science Fundamentals", 
      sub: "Introduction to data analysis and visualization", 
      author: "By Dr. Alex Chen", 
      price: "₹7,499", 
      img: courses1,
      level: "Beginner",
      duration: "8 weeks",
      students: 1876,
      rating: 4.7,
      category: "Data Science"
    },
    { 
      id: 8, 
      title: "Python for Data Analysis", 
      sub: "Learn Python programming for data science", 
      author: "By Maria Rodriguez", 
      price: "₹6,499", 
      img: courses2,
      level: "Intermediate",
      duration: "7 weeks",
      students: 2234,
      rating: 4.8,
      category: "Data Science"
    },
    { 
      id: 9, 
      title: "Deep Learning with TensorFlow", 
      sub: "Build neural networks and deep learning models", 
      author: "By Dr. James Wilson", 
      price: "₹9,499", 
      img: courses3,
      level: "Advanced",
      duration: "9 weeks",
      students: 1456,
      rating: 4.9,
      category: "Machine Learning"
    },
    { 
      id: 10, 
      title: "AWS Cloud Practitioner", 
      sub: "Get certified in AWS cloud computing", 
      author: "By Lisa Thompson", 
      price: "₹11,999", 
      img: courses4,
      level: "Intermediate",
      duration: "6 weeks",
      students: 1678,
      rating: 4.8,
      category: "Cloud Computing"
    },
    { 
      id: 11, 
      title: "Mobile App Development", 
      sub: "Build iOS and Android apps with React Native", 
      author: "By Carlos Martinez", 
      price: "₹9,999", 
      img: courses5,
      level: "Intermediate",
      duration: "8 weeks",
      students: 1987,
      rating: 4.7,
      category: "Mobile Development"
    },
    { 
      id: 12, 
      title: "Cybersecurity Essentials", 
      sub: "Learn the fundamentals of cybersecurity", 
      author: "By Dr. Sarah Johnson", 
      price: "₹12,999", 
      img: courses1,
      level: "Beginner",
      duration: "7 weeks",
      students: 1345,
      rating: 4.8,
      category: "Cybersecurity"
    }
  ];

  const promoSlides = [
    {
      id: 1,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "🤖",
      title: "AI & Machine Learning",
      subtitle: "Master the future of technology with neural networks and deep learning algorithms"
    },
    {
      id: 2,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "📊",
      title: "Data Science",
      subtitle: "Transform raw data into powerful insights and predictive analytics"
    },
    {
      id: 3,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "💻",
      title: "Web Development",
      subtitle: "Build modern, responsive web applications with cutting-edge technologies"
    },
    {
      id: 4,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "🧠",
      title: "Deep Learning",
      subtitle: "Explore neural networks, computer vision, and natural language processing"
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#1B4A8B] mb-4">
            🎓 Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From beginner to advanced, discover courses designed to accelerate your career in technology
          </p>
        </div>

        {/* Promo Banner with Swiper */}
        <section className="rounded-3xl overflow-hidden relative bg-gray-100 mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            style={{ height: '320px' }}
          >
            {promoSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div 
                  className="relative w-full h-full flex items-center"
                  style={{ background: slide.gradient }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
                    <div className="absolute top-12 right-8 w-12 h-12 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-8 left-12 w-16 h-16 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-16 right-4 w-8 h-8 border-2 border-white rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 w-full px-8 md:px-12">
                    <div className="flex items-center gap-6">
                      {/* Icon */}
                      <div className="text-6xl md:text-8xl">
                        {slide.icon}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 text-white">
                        <h2 className="text-3xl md:text-4xl font-black mb-3">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Course Categories Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  category === "All Courses"
                    ? "border-[#1B4A8B] bg-[#1B4A8B] text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-[#1B4A8B] hover:text-[#1B4A8B]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Course Statistics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
              <div className="text-3xl font-black text-blue-600 mb-2">{courses.length}</div>
              <div className="text-sm font-semibold text-blue-800">Total Courses</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
              <div className="text-3xl font-black text-green-600 mb-2">12+</div>
              <div className="text-sm font-semibold text-green-800">Categories</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl border border-purple-200">
              <div className="text-3xl font-black text-purple-600 mb-2">50K+</div>
              <div className="text-sm font-semibold text-purple-800">Students</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl border border-orange-200">
              <div className="text-3xl font-black text-orange-600 mb-2">4.8</div>
              <div className="text-sm font-semibold text-orange-800">Average Rating</div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={course.img} 
                    alt={course.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Level Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                      course.level === 'Beginner' ? 'bg-green-500' :
                      course.level === 'Intermediate' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-700 shadow-sm">
                      {course.price}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="text-sm font-semibold text-indigo-600 mb-2">{course.category}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.sub}</p>
                  
                  {/* Course Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>👨‍🏫 {course.author}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                  
                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold text-slate-700">{course.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">{course.students} students</span>
                  </div>

                  {/* View Course Button */}
                  <Link to={`/courses/${course.id}`} className="block">
                    <button className="w-full bg-[#1B4A8B] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#153a6f] transition-colors duration-300 transform hover:scale-105">
                      View Course
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1B4A8B] to-[#2d5aa0] rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already advancing their careers with our courses
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-white text-[#1B4A8B] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              <span className="mr-2">🚀</span>
              Get Started Today
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
