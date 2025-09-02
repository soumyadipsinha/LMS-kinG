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

export default function Courses() {
  const categories = [
    "Web development",
    "Enterprise IT",
    "ReactJS / NextJS",
    "Javascript",
    "Backend Development",
  ];

  const courses = [
    { id: 1, title: "Advance Machine Learning", sub: "Drive deep into machine learning", author: "By John Doe", price: "$99.89", img: AiPic },
    { id: 2, title: "React for Beginners", sub: "Learn React from scratch", author: "By Jane Smith", price: "$79.99", img: ReactPic },
    { id: 3, title: "Node.js & Express", sub: "Build backend APIs quickly", author: "By Mike Johnson", price: "$89.99", img: NodePic },
    { id: 4, title: "Next.js & SSR", sub: "Server-side rendering made easy", author: "By Sarah Lee", price: "$109.99", img: NextJSPic },
    { id: 5, title: "Fullstack Web Dev", sub: "Learn frontend + backend together", author: "By David Kim", price: "$129.99", img: FullStackPic },
    { id: 6, title: "Javascript Deep Dive", sub: "Master JS fundamentals and ES6+", author: "By Emily Clark", price: "$69.99", img: JSDeepPic },
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
        {/* Promo Banner with Swiper */}
        <section className="rounded-3xl overflow-hidden relative bg-gray-100">
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
                      <div className="flex-1">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            {slide.title}
                          </h2>
                          <p className="text-gray-700 leading-relaxed">
                            {slide.subtitle}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600 font-medium">Live Classes Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 text-white/20 text-4xl">
                    {slide.icon}
                  </div>
                  <div className="absolute bottom-6 left-6 text-white/10 text-2xl">
                    ⚡
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Title */}
        <h1 className="mt-10 md:mt-12 text-3xl md:text-4xl font-extrabold text-[#1B4A8B]">
          Our Courses
        </h1>

        {/* Category Chips */}
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

        {/* Grid of Courses */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              state={{ course, allCourses: courses }}
              className="group"
            >
              <article className="cursor-pointer rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-slate-800">{course.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{course.sub}</p>
                  <p className="mt-1 text-xs text-slate-500">{course.author}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{course.price}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
