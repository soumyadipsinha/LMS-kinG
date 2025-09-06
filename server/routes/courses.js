import express from 'express';
import { 
  getCourses,
  getFeaturedCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  addCourseReview,
  getCourseCategories
} from '../controllers/courseController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { 
  validateCourseCreation, 
  validateCourseUpdate, 
  validateReview,
  validateObjectId,
  validatePagination,
  validateSearch
} from '../middleware/validation.js';

const router = express.Router();

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', optionalAuth, validatePagination, validateSearch, getCourses);

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
router.get('/featured', getFeaturedCourses);

// @desc    Get course categories
// @route   GET /api/courses/categories/list
// @access  Public
router.get('/categories/list', getCourseCategories);

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', optionalAuth, validateObjectId('id'), getCourseById);

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Instructor
router.post('/', protect, authorize('instructor', 'admin'), validateCourseCreation, createCourse);

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Instructor/Admin
router.put('/:id', protect, validateObjectId('id'), validateCourseUpdate, updateCourse);

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor/Admin
router.delete('/:id', protect, validateObjectId('id'), deleteCourse);

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
router.post('/:id/enroll', protect, validateObjectId('id'), enrollInCourse);

// @desc    Add course review
// @route   POST /api/courses/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, validateObjectId('id'), validateReview, addCourseReview);

export default router;