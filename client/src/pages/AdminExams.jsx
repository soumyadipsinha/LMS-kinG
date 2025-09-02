import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminExams() {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "JavaScript Basics Assessment",
      course: "JavaScript Fundamentals",
      type: "Quiz",
      duration: 30,
      totalQuestions: 25,
      passingScore: 70,
      status: "active",
      attempts: 156,
      avgScore: 78.5,
      createdAt: "2024-01-10",
      scheduledDate: "2024-01-25"
    },
    {
      id: 2,
      title: "React Components Test",
      course: "React for Web Development",
      type: "Exam",
      duration: 60,
      totalQuestions: 40,
      passingScore: 75,
      status: "active",
      attempts: 89,
      avgScore: 82.3,
      createdAt: "2024-01-08",
      scheduledDate: "2024-01-28"
    },
    {
      id: 3,
      title: "Node.js API Quiz",
      course: "Node.js & APIs",
      type: "Quiz",
      duration: 45,
      totalQuestions: 30,
      passingScore: 65,
      status: "draft",
      attempts: 0,
      avgScore: 0,
      createdAt: "2024-01-05",
      scheduledDate: "2024-02-01"
    },
    {
      id: 4,
      title: "Machine Learning Final",
      course: "Machine Learning Basics",
      type: "Final Exam",
      duration: 120,
      totalQuestions: 60,
      passingScore: 80,
      status: "active",
      attempts: 67,
      avgScore: 76.8,
      createdAt: "2023-12-20",
      scheduledDate: "2024-01-30"
    },
    {
      id: 5,
      title: "Full Stack Project Review",
      course: "Full Stack Development",
      type: "Project",
      duration: 180,
      totalQuestions: 1,
      passingScore: 85,
      status: "active",
      attempts: 34,
      avgScore: 88.2,
      createdAt: "2023-12-15",
      scheduledDate: "2024-02-05"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || exam.type === typeFilter;
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const examTypes = ["all", "Quiz", "Exam", "Final Exam", "Project"];
  const examStatuses = ["all", "active", "draft", "archived"];

  const handleDeleteExam = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const handleStatusToggle = (id, newStatus) => {
    setExams(exams.map(exam => 
      exam.id === id ? { ...exam, status: newStatus } : exam
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
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

  const getTypeBadge = (type) => {
    const typeConfig = {
      Quiz: { bg: "bg-blue-100", text: "text-blue-800" },
      Exam: { bg: "bg-purple-100", text: "text-purple-800" },
      "Final Exam": { bg: "bg-red-100", text: "text-red-800" },
      Project: { bg: "bg-indigo-100", text: "text-indigo-800" }
    };
    const config = typeConfig[type] || typeConfig.Quiz;
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
        {type}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600 mt-1">Create and manage exams, quizzes, and assessments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300"
        >
          📝 Create New Exam
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search exams by title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
          >
            {examTypes.map(type => (
              <option key={type} value={type}>
                {type === "all" ? "All Types" : type}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
          >
            {examStatuses.map(status => (
              <option key={status} value={status}>
                {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Exam Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                {getTypeBadge(exam.type)}
                {getStatusBadge(exam.status)}
              </div>
              <h3 className="text-lg font-bold line-clamp-2">{exam.title}</h3>
              <p className="text-purple-100 text-sm">{exam.course}</p>
            </div>

            {/* Exam Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{exam.duration}</div>
                  <div className="text-xs text-gray-600">Minutes</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{exam.totalQuestions}</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Passing Score:</span>
                  <span className="font-semibold text-gray-900">{exam.passingScore}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Attempts:</span>
                  <span className="font-semibold text-gray-900">{exam.attempts}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Score:</span>
                  <span className={`font-semibold ${getScoreColor(exam.avgScore)}`}>
                    {exam.avgScore > 0 ? `${exam.avgScore}%` : "N/A"}
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <div>Created: {new Date(exam.createdAt).toLocaleDateString()}</div>
                <div>Scheduled: {new Date(exam.scheduledDate).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingExam(exam)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(exam.id, exam.status === "active" ? "draft" : "active")}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    exam.status === "active"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {exam.status === "active" ? "⏸️ Pause" : "▶️ Activate"}
                </button>
                <button
                  onClick={() => handleDeleteExam(exam.id)}
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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Exams</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.filter(e => e.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.reduce((acc, e) => acc + e.attempts, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-white">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {(() => {
                  const activeExams = exams.filter(e => e.status === "active" && e.avgScore > 0);
                  if (activeExams.length === 0) return "N/A";
                  const avg = activeExams.reduce((acc, e) => acc + e.avgScore, 0) / activeExams.length;
                  return `${avg.toFixed(1)}%`;
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📝</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Create Quiz</span>
          </button>
          
          <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📋</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Create Exam</span>
          </button>
          
          <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-300 group">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📊</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">View Results</span>
          </button>
          
          <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⏰</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Schedule Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
}
