import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React for Web Development",
      description: "Learn React fundamentals and build real applications",
      instructor: "Dr. John Smith",
      category: "Frontend Development",
      level: "Intermediate",
      duration: "8 weeks",
      price: 7999,
      students: 234,
      rating: 4.8,
      status: "published",
      image: "react-pic.jpg",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Master JavaScript basics and modern ES6+ features",
      instructor: "Prof. Sarah Johnson",
      category: "Programming",
      level: "Beginner",
      duration: "6 weeks",
      price: 5999,
      students: 198,
      rating: 4.7,
      status: "published",
      image: "javascript-pic.jpg",
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      title: "Node.js & APIs",
      description: "Build scalable backend APIs with Node.js and Express",
      instructor: "Mike Chen",
      category: "Backend Development",
      level: "Intermediate",
      duration: "10 weeks",
      price: 8999,
      students: 156,
      rating: 4.9,
      status: "published",
      image: "Node-pic.jpg",
      createdAt: "2023-12-20"
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      description: "Introduction to ML algorithms and data science",
      instructor: "Dr. Emily Brown",
      category: "Data Science",
      level: "Advanced",
      duration: "12 weeks",
      price: 12999,
      students: 142,
      rating: 4.6,
      status: "draft",
      image: "Ai-pic.jpg",
      createdAt: "2023-12-15"
    },
    {
      id: 5,
      title: "Full Stack Development",
      description: "Complete web development from frontend to backend",
      instructor: "David Wilson",
      category: "Full Stack",
      level: "Advanced",
      duration: "16 weeks",
      price: 15999,
      students: 89,
      rating: 4.9,
      status: "published",
      image: "FullStack-pic.jpg",
      createdAt: "2023-11-30"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...new Set(courses.map(c => c.category))];
  const statuses = ["all", "published", "draft", "archived"];

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleStatusToggle = (id, newStatus) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: newStatus } : course
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { bg: "bg-green-100", text: "text-green-800", label: "Published" },
      draft: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Draft" },
      archived: { bg: "bg-gray-100", text: "text-gray-800", label: "Archived" }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
        {config.label}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelConfig = {
      Beginner: { bg: "bg-blue-100", text: "text-blue-800" },
      Intermediate: { bg: "bg-yellow-100", text: "text-yellow-800" },
      Advanced: { bg: "bg-red-100", text: "text-red-800" }
    };
    const config = levelConfig[level] || levelConfig.Beginner;
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
        {level}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage all courses and their content</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300"
        >
          📚 Add New Course
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search courses by title, description, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Course Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                {getStatusBadge(course.status)}
              </div>
              {/* Level Badge */}
              <div className="absolute top-3 right-3">
                {getLevelBadge(course.level)}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{course.instructor}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{course.students} students</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(course.id, course.status === "published" ? "draft" : "published")}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    course.status === "published"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {course.status === "published" ? "⏸️ Unpublish" : "▶️ Publish"}
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.filter(c => c.status === "published").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{(courses.reduce((acc, c) => acc + (c.price * c.students), 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
