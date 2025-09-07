# Course Management Feature Guide

This guide explains how to use the complete course management system that connects the admin dashboard to the frontend.

## 🚀 Features Implemented

### Backend (Server)
- ✅ Complete course CRUD operations
- ✅ File upload system with Cloudinary integration
- ✅ Course validation and error handling
- ✅ Authentication and authorization
- ✅ Course categories and filtering
- ✅ Course enrollment and reviews
- ✅ Featured courses system

### Frontend (Client)
- ✅ Admin dashboard for course management
- ✅ Public courses page with filtering
- ✅ Course service for API communication
- ✅ File upload integration
- ✅ Responsive design with loading states
- ✅ Error handling and fallbacks

## 📁 Files Modified/Created

### New Files
- `client/src/services/courseService.js` - API service for course operations
- `server/test-course-api.js` - Test script for API endpoints
- `COURSE_MANAGEMENT_GUIDE.md` - This guide

### Modified Files
- `client/src/pages/AdminCourses.jsx` - Updated with backend integration
- `client/src/pages/Courses.jsx` - Updated to fetch from backend
- `server/controllers/courseController.js` - Added instructor courses endpoint
- `server/routes/courses.js` - Added instructor courses route

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies

Make sure you have all required dependencies installed:

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 3. Start the Application

**Start the server:**
```bash
cd server
npm run dev
```

**Start the client:**
```bash
cd client
npm run dev
```

## 🎯 How to Use

### Admin Dashboard - Course Management

1. **Access Admin Dashboard**
   - Navigate to `/admin/courses`
   - Login with admin credentials

2. **Add New Course**
   - Click "📚 Add New Course" button
   - Fill in course details:
     - Title, description, category, level
     - Duration, price, currency
     - Upload thumbnail image
     - Add modules with content
   - Set publication status
   - Click "Create Course"

3. **Edit Existing Course**
   - Click "✏️ Edit" on any course card
   - Modify course details
   - Update modules
   - Save changes

4. **Manage Course Status**
   - Use "▶️ Publish" / "⏸️ Unpublish" buttons
   - Toggle featured status in edit modal

5. **Delete Course**
   - Click "🗑️" button
   - Confirm deletion

### Public Courses Page

1. **View All Courses**
   - Navigate to `/courses`
   - See all published courses
   - Filter by category
   - Search courses

2. **Course Details**
   - Click "View Course" on any course
   - See detailed course information
   - View modules and content

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/courses` - Get all published courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/categories/list` - Get course categories
- `GET /api/courses/:id` - Get course by ID

### Protected Endpoints (Admin/Instructor)
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/instructor/:instructorId` - Get courses by instructor

### File Upload Endpoints
- `POST /api/upload/thumbnail` - Upload course thumbnail
- `POST /api/upload/video` - Upload course video
- `POST /api/upload/document` - Upload course document
- `DELETE /api/upload/:publicId` - Delete uploaded file

## 🧪 Testing

### Run API Tests
```bash
cd server
node test-course-api.js
```

### Manual Testing Checklist

**Admin Dashboard:**
- [ ] Can create new course
- [ ] Can edit existing course
- [ ] Can upload course thumbnail
- [ ] Can add/remove modules
- [ ] Can publish/unpublish courses
- [ ] Can delete courses
- [ ] Form validation works
- [ ] Error handling works

**Public Courses Page:**
- [ ] Displays courses from backend
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Loading states display
- [ ] Error states display
- [ ] Fallback to static courses if API fails

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if server is running on port 5000
   - Verify `VITE_API_URL` in client `.env`
   - Check CORS configuration

2. **File Upload Issues**
   - Verify Cloudinary configuration
   - Check file size limits
   - Ensure proper file types

3. **Authentication Issues**
   - Check if user is logged in
   - Verify admin role permissions
   - Check JWT token validity

4. **Course Not Displaying**
   - Check if course is published
   - Verify course data structure
   - Check browser console for errors

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📊 Data Flow

1. **Admin creates course** → Backend API → Database
2. **Course published** → Available in public API
3. **Frontend fetches courses** → Displays on courses page
4. **User views course** → Course details page

## 🔒 Security Features

- JWT authentication for protected routes
- Role-based authorization (admin/instructor)
- Input validation and sanitization
- File upload security
- Rate limiting on API endpoints

## 🚀 Future Enhancements

- Course enrollment system
- Payment integration
- Course progress tracking
- Advanced search and filtering
- Course reviews and ratings
- Bulk course operations
- Course analytics dashboard

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check database connection
5. Review API endpoint responses

---

**Happy Course Management! 🎓**
