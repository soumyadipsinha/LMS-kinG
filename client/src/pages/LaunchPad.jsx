// src/pages/LaunchPad.jsx
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react"; // Icons
import pic6 from "../assets/pic6.png";
import Aipic from "../assets/Ai-pic.jpg";
import Microsoft1 from "../assets/Microsoft1.jpg";
import Google1 from "../assets/Google1.jpg";
import Meta1 from "../assets/Meta1.jpg";


const LaunchPad = () => {
  const phases = [
    {
      bg: Aipic,
      phase: "Phase 1",
      desc: "Live Weekly Sessions (6 Classes/Weeks)",
      detail: [
        "Power Bi",
        "Tableau",
        "Excel(Advance)",
        "MS Office(Advance)",
        "Professional Branding & LinkedIn Optimisation",
        "Data Science Essentials",
        "SQL",
        "Python",
        "PowerPoint",
        "Ai Acceleration",
        "Ai Supply Chain & Management",
        "No Code Ai Website Building"
      ],
    },
    {
      bg: Microsoft1,
      phase: "Phase 2",
      desc: "Microsoft Data Analyst Training (1 Month)",
      detail: [
        "Key Modules (1 Month Video Recorded)",
        "Preparing Data for Analysis with Microsoft Excel",
        "Harnessing the Power of Data with Power BI",
        "Extract, Transform & Load (ETL) in Power BI",
        "Data Modelling & Visualization Techniques",
        "Creative Dashboard Design Principles",
        "Capstone Project Application",
        "Microsoft PL-300 Exam Preparation",
      ],
    },
    {
      bg: Google1,
      phase: "Phase 3",
      desc: "Google Data Analyst Training (1 Month)",
      detail: [
        "Key Modules (1 Month Video Recorded)",
        "Data Foundations & Decision Making",
        "Data Cleaning & Preparation Strategies",
        "Data Exploration & Analytics Techniques",
        "Effective Data Visualization",
        "Data Analysis with R Programming",
        "Google Data Analytics Capstone Project",
        "Accelerate Job Search with AI Tools",
      ],
    },
    {
      bg: Meta1,
      phase: "Phase 4",
      desc: "Meta Data Analyst Training (1 Month)",
      detail: [
        "Key Modules (1 Month Video Recorded)",
        "Data Analytics with Spreadsheets & SQL",
        "Python Data Analytics Applications",
        "Statistics Foundation for Data Science",
        "Data Management Basics",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 font-inter">
      {/* Header Section */}
      <section className="relative min-h-[420px] flex flex-col justify-center items-center text-center overflow-hidden bg-white pt-16 pb-12">
        <div className="text-7xl md:text-7xl mb-6 animate-bounce">🤖</div>

        <h1 className="flex flex-wrap justify-center font-extrabold mb-6 text-6xl md:text-7xl">
          <span className="text-black">LAUNCHPAD MASTER </span>
          <span
            className="bg-gradient-to-r from-[#2337fc] via-[#e545fc] to-[#2cc1ff]"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PROGRAM
          </span>
        </h1>

        <p
          className="text-2xl font-semibold max-w-3xl mx-auto mb-4 tracking-wide"
          style={{
            background:
              "linear-gradient(90deg, #2337fc 15%, #e545fc 45%, #2cc1ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Empowering Learners Worldwide
        </p>

        <p
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 opacity-0 animate-fadeIn leading-relaxed"
          style={{
            animationFillMode: "forwards",
            animationDuration: "2s",
            animationDelay: "0.5s",
          }}
        >
          Your 90-Day Career Acceleration Journey starts. Triple Certifications &
          Real-world Experience.
          <br />
          These three key modules are designed to equip you with essential
          expertise, credential, and project exposure.
        </p>

        {/* Decorative Circles */}
        <span className="absolute left-8 top-14 w-36 h-36 bg-gradient-to-r from-[#79b4ff59] to-[#eca0fc32] rounded-full"></span>
        <span className="absolute right-12 top-7 w-28 h-28 bg-gradient-to-r from-[#79b4ff6a] to-[#eca0fc32] rounded-full"></span>
        <span className="absolute right-24 bottom-16 w-28 h-28 bg-gradient-to-br from-[#fdb7b7a8] to-[#cbb9ff66] rounded-full"></span>

        <style>
          {`
            @keyframes fadeIn {
              to { opacity: 1; }
            }
            .animate-fadeIn {
              animation-name: fadeIn;
            }
          `}
        </style>
      </section>

      {/* Three Modules */}
      <section className="flex flex-wrap justify-center gap-6 px-6 mb-12">
        {[
          { title: "Week 1: Corporate Ready Training", desc: "Speaker Session • Storytelling • Workplace Readiness" },
          { title: "Week 2: Technical Mastery Upskilling", desc: "Top Data Competencies • Advanced Analytics Tools • King Technologies Master Course" },
          { title: "Week 3: Placement Support", desc: "Interview Preparation • Resume Review • Job Fair Connect" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-8 w-[300px] text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-[#2C357E] mb-4">{item.title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Career Accelerator */}
      <section className="relative bg-white py-20 px-6 max-w-6xl mx-auto rounded-3xl overflow-hidden">
        <h2
          className="text-center text-5xl font-extrabold mb-6"
          style={{
            background: "linear-gradient(90deg, #2337fc 15%, #e545fc 45%, #2cc1ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Accelerate Your Data Analytics Career
        </h2>

        <p className="text-center max-w-3xl mx-auto text-xl text-gray-700 mb-12 leading-relaxed">
          Our intensive programme is structured to provide comprehensive training and placement support over three months.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 justify-center">
          {phases.map((item, idx) => (
            <Link
              key={idx}
              to="/launchpad/details"
              state={{ bg: item.bg, title: item.phase, desc: item.detail }}
            >
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden w-[380px] h-[280px] flex flex-col justify-end text-center text-white mx-auto hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${item.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="relative z-10 p-6">
                  <p className="font-bold text-2xl">{item.phase}</p>
                  <p className="text-base mt-2">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="relative bg-white py-5 px-6 max-w-6xl mx-auto rounded-3xl overflow-hidden mt-16">
        <h2
          className="text-center text-5xl font-extrabold mb-12"
          style={{
            background: "linear-gradient(90deg, #2337fc 15%, #e545fc 45%, #2cc1ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Path to Recognised Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Side: Credentials List */}
          <div className="bg-gray-50 p-8 rounded-2xl transition shadow-md hover:shadow-lg">
            <ul className="text-gray-700 text-lg space-y-5 leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
                <span><span className="font-bold">Global Certifications:</span> Google, Microsoft Azure, Meta - Data Analyst</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />
                <span><span className="font-bold">Programme & Tool-Specific:</span> King Technologies Mastery Course, 12 Tool-Specific</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-600 w-6 h-6 flex-shrink-0 mt-1" />
                <span><span className="font-bold">Practical Experience:</span> Internship Certificate, Live Project Certificate</span>
              </li>
            </ul>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center">
            <img
              src={pic6}
              alt="Student"
              className="w-90 h-90 object-cover rounded-full transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaunchPad;
