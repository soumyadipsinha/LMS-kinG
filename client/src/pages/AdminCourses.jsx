import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseService, uploadService } from "../services/courseService";

// Utility to make local previews from File
const makePreview = (file) => (file ? URL.createObjectURL(file) : null);

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Modal form state
  const emptyModule = () => ({
    id: crypto.randomUUID(),
    title: "",
    type: "video", // video | image
    description: "",
    file: null, // File object
    filePreview: null, // local preview
    thumbnail: null, // optional File
    thumbnailPreview: null, // local preview
  });

  const initialForm = {
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    level: "beginner",
    duration: "",
    price: "",
    originalPrice: "",
    currency: "INR",
    isPublished: false,
    isFeatured: false,
    tags: [],
    requirements: [],
    learningOutcomes: [],
    modules: [emptyModule()],
    thumbnail: null,
    thumbnailPreview: null,
  };

  const [form, setForm] = useState(initialForm);

  // Load courses and categories on component mount
  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCourses({ limit: 100 });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setErrorMsg('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await courseService.getCourseCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const filteredCourses = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return courses.filter(course => {
      const matchesSearch =
        !q ||
        course.title?.toLowerCase().includes(q) ||
        course.description?.toLowerCase().includes(q) ||
        course.instructor?.firstName?.toLowerCase().includes(q) ||
        course.instructor?.lastName?.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || course.isPublished === (statusFilter === "published");
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [courses, searchTerm, categoryFilter, statusFilter]);

  const getStatusBadge = (isPublished) => {
    const status = isPublished ? "published" : "draft";
    const statusConfig = {
      published: { bg: "bg-green-100", text: "text-green-800", label: "Published" },
      draft: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Draft" },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
        {config.label}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelConfig = {
      beginner: { bg: "bg-blue-100", text: "text-blue-800" },
      intermediate: { bg: "bg-yellow-100", text: "text-yellow-800" },
      advanced: { bg: "bg-red-100", text: "text-red-800" }
    };
    const config = levelConfig[level] || levelConfig.beginner;
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
        {level?.charAt(0).toUpperCase() + level?.slice(1)}
      </span>
    );
  };

  // Modal controls
  const openAddModal = () => {
    setEditingCourse(null);
    setForm({ ...initialForm });
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (course) => {
    // Convert course data to form format
    const normalizedModules = (course.modules || []).map(m => ({
      id: crypto.randomUUID(),
      title: m.title || "",
      type: m.videoFile ? "video" : "image",
      description: m.description || "",
      file: null,
      filePreview: null,
      thumbnail: null,
      thumbnailPreview: null,
    }));

    setEditingCourse(course);
    setForm({
      title: course.title || "",
      shortDescription: course.shortDescription || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "beginner",
      duration: course.duration || "",
      price: course.price || "",
      originalPrice: course.originalPrice || "",
      currency: course.currency || "INR",
      isPublished: course.isPublished || false,
      isFeatured: course.isFeatured || false,
      tags: course.tags || [],
      requirements: course.requirements || [],
      learningOutcomes: course.learningOutcomes || [],
      modules: normalizedModules.length ? normalizedModules : [emptyModule()],
      thumbnail: null,
      thumbnailPreview: course.thumbnail || null,
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const closeModal = () => {
    // Revoke previews to avoid memory leaks
    form.modules.forEach(m => {
      if (m.filePreview) URL.revokeObjectURL(m.filePreview);
      if (m.thumbnailPreview) URL.revokeObjectURL(m.thumbnailPreview);
    });
    if (form.thumbnailPreview) URL.revokeObjectURL(form.thumbnailPreview);
    
    setShowModal(false);
    setSubmitting(false);
    setForm(initialForm);
    setEditingCourse(null);
  };

  // CRUD operations
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await courseService.deleteCourse(id);
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
      setErrorMsg('Failed to delete course');
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const course = courses.find(c => c._id === id);
      if (!course) return;

      await courseService.updateCourse(id, { isPublished: newStatus });
      setCourses(prev => prev.map(c => 
        c._id === id ? { ...c, isPublished: newStatus } : c
      ));
    } catch (error) {
      console.error('Error updating course status:', error);
      setErrorMsg('Failed to update course status');
    }
  };

  // Form handlers
  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const updateModule = (id, patch) =>
    setForm(prev => ({
      ...prev,
      modules: prev.modules.map(m => (m.id === id ? { ...m, ...patch } : m)),
    }));

  const addModule = () =>
    setForm(prev => ({
      ...prev,
      modules: [...prev.modules, emptyModule()],
    }));

  const removeModule = (id) =>
    setForm(prev => ({
      ...prev,
      modules: prev.modules.length > 1 ? prev.modules.filter(m => m.id !== id) : prev.modules,
    }));

  const onChangeModuleFile = (id, file) => {
    const preview = makePreview(file);
    updateModule(id, { file, filePreview: preview });
  };

  const onChangeModuleThumb = (id, file) => {
    const preview = makePreview(file);
    updateModule(id, { thumbnail: file, thumbnailPreview: preview });
  };

  const onChangeThumbnail = (file) => {
    const preview = makePreview(file);
    setForm(prev => ({ ...prev, thumbnail: file, thumbnailPreview: preview }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Course title is required";
    if (!form.shortDescription.trim()) return "Short description is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.category.trim()) return "Category is required";
    if (!form.duration.trim()) return "Duration is required";
    if (form.price === "" || Number.isNaN(Number(form.price))) return "Valid price is required";
    if (!form.thumbnail && !editingCourse) return "Course thumbnail is required";
    
    for (const m of form.modules) {
      if (!m.title.trim()) return "Each module must have a title";
      if (!["video", "image"].includes(m.type)) return "Module type must be video or image";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setSubmitting(true);
    setErrorMsg("");

    try {
      let thumbnailUrl = form.thumbnailPreview;

      // Upload thumbnail to Cloudinary if new file is selected
      if (form.thumbnail) {
        console.log('Uploading thumbnail to Cloudinary...');
        const uploadResponse = await uploadService.uploadThumbnail(form.thumbnail);
        thumbnailUrl = uploadResponse.data.thumbnail.url;
        console.log('Thumbnail uploaded successfully:', thumbnailUrl);
      }

      // Prepare course data
      const courseData = {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        category: form.category,
        level: form.level,
        duration: Number(form.duration),
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        currency: form.currency,
        thumbnail: thumbnailUrl,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
        tags: form.tags.filter(tag => tag.trim()),
        requirements: form.requirements.filter(req => req.trim()),
        learningOutcomes: form.learningOutcomes.filter(outcome => outcome.trim()),
        modules: form.modules.map(m => ({
          title: m.title,
          description: m.description,
          content: m.description, // Using description as content for now
          order: form.modules.indexOf(m) + 1,
          isFree: false,
        })),
      };

      console.log('Saving course data:', courseData);

      if (editingCourse) {
        // Update existing course
        const response = await courseService.updateCourse(editingCourse._id, courseData);
        console.log('Course updated successfully:', response);
        setCourses(prev => prev.map(c => 
          c._id === editingCourse._id ? { ...c, ...courseData } : c
        ));
      } else {
        // Create new course
        const response = await courseService.createCourse(courseData);
        console.log('Course created successfully:', response);
        
        // Add the new course to the beginning of the list
        const newCourse = response.data.course;
        setCourses(prev => [newCourse, ...prev]);
        
        // Show success message
        setErrorMsg(`Course "${newCourse.title}" created successfully!`);
        setTimeout(() => setErrorMsg(""), 3000);
      }

      closeModal();
      
      // Reload courses to ensure we have the latest data
      setTimeout(() => {
        loadCourses();
      }, 1000);
      
    } catch (error) {
      console.error('Error saving course:', error);
      setErrorMsg(error.message || error.response?.data?.message || 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage all courses and their content</p>
        </div>
        <button
          onClick={openAddModal}
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
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category._id}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Course Image / Cover */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt="course thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">📚</span>
                )}
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                {getStatusBadge(course.isPublished)}
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
                <span className="text-sm text-gray-500">{course.duration}h</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.shortDescription}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {course.instructor?.firstName?.charAt(0) || 'I'}
                  </div>
                  <span className="text-sm text-gray-700">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-700">{course.rating?.average || 0}</span>
                  </div>
                  <span className="text-xs text-gray-500">{course.enrollmentCount || 0} students</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {course.currency} {Number(course.price || 0).toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  Created: {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "-"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(course)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(course._id, !course.isPublished)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    course.isPublished
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {course.isPublished ? "⏸️ Unpublish" : "▶️ Publish"}
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  🗑️
                </button>
              </div>

              {/* Module preview */}
              {course.modules?.length ? (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Modules:</p>
                  <ul className="space-y-1">
                    {course.modules.slice(0, 3).map((m, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="font-medium">{m.title}</span>
                      </li>
                    ))}
                    {course.modules.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{course.modules.length - 3} more modules
                      </li>
                    )}
                  </ul>
                </div>
              ) : null}
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
                {courses.filter(c => c.isPublished).length}
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
                {(courses.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0)).toLocaleString()}
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
                ₹{(courses.reduce((acc, c) => acc + ((c.price || 0) * (c.enrollmentCount || 0)), 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>✖</button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
              {errorMsg ? (
                <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">{errorMsg}</div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., React for Web Development"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="data-science">Data Science</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="photography">Photography</option>
                    <option value="music">Music</option>
                    <option value="language">Language</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Level *</label>
                  <select
                    value={form.level}
                    onChange={(e) => updateField("level", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (hours) *</label>
                  <input
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., 40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., 7999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Original Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.originalPrice}
                    onChange={(e) => updateField("originalPrice", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., 9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Short Description *</label>
                  <input
                    type="text"
                    value={form.shortDescription}
                    onChange={(e) => updateField("shortDescription", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Brief description for course cards"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Detailed course description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Course Thumbnail *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChangeThumbnail(e.target.files?.[0] || null)}
                    className="mt-1 w-full text-sm"
                    required={!editingCourse}
                  />
                  {form.thumbnailPreview && (
                    <img src={form.thumbnailPreview} alt="thumbnail preview" className="mt-2 h-24 w-32 object-cover rounded" />
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => updateField("isPublished", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Published</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => updateField("isFeatured", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              {/* Modules */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Modules</h3>
                  <button
                    type="button"
                    onClick={addModule}
                    className="px-3 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                  >
                    ➕ Add Module
                  </button>
                </div>

                <div className="mt-3 space-y-4">
                  {form.modules.map((m, idx) => (
                    <div key={m.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Module {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeModule(m.id)}
                          className="text-red-600 text-sm hover:underline"
                          disabled={form.modules.length === 1}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title *</label>
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => updateModule(m.id, { title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                            placeholder="Module title"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Type</label>
                          <select
                            value={m.type}
                            onChange={(e) => updateModule(m.id, { type: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                          >
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            value={m.description}
                            onChange={(e) => updateModule(m.id, { description: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                            rows={2}
                            placeholder="Module summary or notes"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-lg ${editingCourse ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}