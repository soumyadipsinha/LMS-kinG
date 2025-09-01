// src/pages/Home.jsx
import StatCard from "../components/StatCard.jsx";
import CourseCard from "../components/CourseCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { Link } from "react-router-dom";
import pic5 from "../assets/pic5.png"; 
import pic6 from "../assets/pic6.png"; 
import { BiSolidCheckCircle } from "react-icons/bi";


export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-5 md:py-5">
          <div>
            <h1 className="text-4xl md:text-8xl font-extrabold leading-tight text-[#1B4A8B]">
              LITERA
            </h1>
            <p className="mt-3 md:text-3xl text-slate-600">
              A Best Platform Enroll in your Special CourseA Best Platform Enroll in your Special Course
            </p>
            <div className="mt-6">
                <Link
                    to="/courses"
                    className="inline-flex rounded-full border-2 border-[#1B4A8B] bg-white text-[#1B4A8B] font-semibold px-6 py-3 shadow 
                      hover:bg-[#1B4A8B] hover:text-white hover:border-transparent transition-colors duration-300"
                >
                    Enroll Your Courses
                </Link>
            </div>
            {/* <div className="mt-8">
               <h3 className="text-center text-xl font-extrabold tracking-wide text-slate-800 mb-6">
                 Why Choose LITERA?
               </h3>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                 <StatCard
                   icon="🎥"
                   title="Daily Live"
                   desc="Interactive classes"
                 />
                 <StatCard icon="⏱️" title="24/7" desc="Doubt solving support" />
                 <StatCard
                   icon="📊"
                   title="1 Million+"
                   desc="Tests, reports & more"
                 />
                 <StatCard icon="🖥️" title="20+" desc="Online courses" />
               </div>
             </div> */}
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-amber-100 rounded-full -z-10" />
            <div className="rounded-2xl overflow-hidden">
              <img
                  src={pic5} alt="Student"  className="w-[481px] h-[381px] "/>
            </div>
          </div>
        </div>
      </section>

      <StatCard/>

      {/* Explore Courses section */}
      <section className="py-12 md:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-5xl font-extrabold tracking-wide text-[#1B4A8B]">
            Explore Our Courses
          </h2>
          <p className="mt-2 text-center text-lg text-slate-500">
          From Beginner to advanced , in all  industries , we  have the right courses just for you and<br/> preparing your entire journey for learning and making the most
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["New Beginners", "Intermediate", "Advanced", "Data Science"].map(
              (t) => (
                <button
                  key={t}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-700"
                >
                  {t}
                </button>
              )
            )}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CourseCard
              title="Intro to JavaScript"
              level="Beginner Level"
              desc="Kickstart coding with JS fundamentals."
            />
            <CourseCard
              title="React for Web"
              level="Intermediate"
              desc="Build real apps with components & hooks."
            />
            <CourseCard
              title="Node & APIs"
              level="Intermediate"
              desc="Create secure REST APIs with Node/Express."
            />
            <CourseCard
              title="Data Analysis"
              level="Advanced"
              desc="Work with datasets and insights."
            />
          </div>
        </div>
      </section>

      {/* Coaching by Skilled Advisors */}
      <section className="py-12 md:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-indigo-100 rounded-full -z-10" />
            <img
              src={pic6}
              alt="Mentor"
              // className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-[#1B4A8B]">
              We offering Coaching by Skilled Advisors
            </h3>
            <p className="mt-3 text-slate-600">
              From Beginner to advanced , in all  industries , we  have the right courses just for you and preparing your entire journey for learning and making the most
            </p>

            <ul className="mt-5 grid sm:grid-cols-2 gap-4">
              <li className="flex gap-3">
                <span className="text-[#1B4A8B]"><BiSolidCheckCircle /></span>
                <div>
                  <div className="font-semibold text-slate-800">
                    PERSONALIZED LEARNING
                  </div>
                  <p className="text-sm text-slate-600">
                    Offer tailor learning experiences through AI and machine learning to cater to individual students' needs.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1B4A8B]"><BiSolidCheckCircle /></span>
                <div>
                  <div className="font-semibold text-slate-800">
                    INNOVATIVE TECHNOLOGY
                  </div>
                  <p className="text-sm text-slate-600">
                    Utilize cutting-edge technology, such as augmented reality or virtual reality, to create immersive learning experiences.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1B4A8B]"><BiSolidCheckCircle /></span>
                <div>
                  <div className="font-semibold text-slate-800">
                    ANALYTICS AND INSIGHTS
                  </div>
                  <p className="text-sm text-slate-600">
                    Offer detailed progress tracking and analytics to help students and teachers monitor performance and make data-driven decisions.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1B4A8B]"><BiSolidCheckCircle /></span>
                <div>
                  <div className="font-semibold text-slate-800">
                    INDUSTRY PARTNERSHIPS
                  </div>
                  <p className="text-sm text-slate-600">
                    Collaborate with well-known companies and institutions to offer accredited courses and certifications, adding credibility to your offerings.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Positive Impact / Testimonials */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-5xl font-extrabold text-[#1B4A8B]">
            Our Positive Impact
          </h3>
          <p className="mt-2 text-center text-xl text-slate-600">
            We have collected some testimonials from our users. They are real people who have used our product.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <TestimonialCard
              quote="Courses are well structured and easy to follow."
              name="Aarav Sharma"
              role="Product Designer"
            />
            <TestimonialCard
              quote="Mentors are supportive and sessions are engaging."
              name="Priya Verma"
              role="Frontend Developer"
            />
            <TestimonialCard
              quote="Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!"
              name="Rohit Singh"
              role="Data Analyst"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
