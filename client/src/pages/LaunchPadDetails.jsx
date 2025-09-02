import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const LaunchPadDetails = () => {
  const location = useLocation();
  const { bg, logo, title, desc } = location.state || {};
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Dummy course data - you can replace this with actual data from your backend
  const courseData = {
    title: title || "Advanced Web Development",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    level: "Intermediate",
    progress: 65,
    modules: [
      "Introduction to Modern Web Development",
      "React.js Fundamentals",
      "Node.js Backend Development",
      "Database Design & Management",
      "API Development & Integration",
      "Deployment & DevOps"
    ],
    nextLesson: "React.js Fundamentals - Part 2",
    certificate: "Web Development Professional Certificate"
  };

  if (!title) {
    return (
      <div className="text-center mt-20 text-2xl font-semibold">
        No data found!
      </div>
    );
  }

  const handleDownloadCertificate = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          // Simulate file download completion
          setTimeout(() => {
            alert("Certificate downloaded successfully!");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleResumeCourse = () => {
    // Navigate to the next lesson or current progress
    alert(`Resuming course: ${courseData.nextLesson}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Image */}
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src={bg || "/src/assets/courses1.jpg"}
                  alt={title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {courseData.progress}% Complete
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Master modern web development with hands-on projects and real-world applications
                  </p>
                </div>
                {logo && (
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg shadow-md overflow-hidden border border-gray-300">
                    <img
                      src={logo}
                      alt="logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{courseData.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{courseData.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{courseData.modules.length}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{courseData.instructor.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">Instructor</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-sm font-medium text-gray-700">{courseData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${courseData.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleResumeCourse}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ▶ Resume Course
                </button>
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Downloading... {downloadProgress}%
                    </span>
                  ) : (
                    "📜 Download Certificate"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Modules */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h2>
              <div className="space-y-4">
                {courseData.modules.map((module, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{module}</h3>
                      <p className="text-sm text-gray-600">Estimated time: 2-3 hours</p>
                    </div>
                    <div className="text-green-500">
                      {index < Math.floor(courseData.progress / 16.67) ? "✓" : "○"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Details & Actions */}
          <div className="space-y-6">
            {/* Next Lesson */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Lesson</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{courseData.nextLesson}</h4>
                <p className="text-sm text-blue-700 mb-3">Continue where you left off</p>
                <button
                  onClick={handleResumeCourse}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>

            {/* Certificate Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Certificate</h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{courseData.certificate}</h4>
                <p className="text-sm text-gray-600 mb-4">Complete the course to earn your certificate</p>
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading || courseData.progress < 100}
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {courseData.progress < 100 ? "Complete Course First" : "Download Certificate"}
                </button>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Course</h3>
              <div className="space-y-3">
                {Array.isArray(desc) ? (
                  desc.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">{desc}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/launchpad"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
          >
            ← Back to LaunchPad
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchPadDetails;
