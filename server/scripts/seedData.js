import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-king');
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'student',
        profile: {
          bio: 'Passionate learner and aspiring developer',
          skills: ['JavaScript', 'HTML', 'CSS'],
          socialLinks: {
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe'
          }
        },
        subscription: {
          plan: 'premium',
          isActive: true
        }
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'instructor',
        profile: {
          bio: 'Senior Full-Stack Developer with 10+ years experience',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
          experience: [
            {
              title: 'Senior Developer',
              company: 'Tech Corp',
              duration: '5 years',
              description: 'Led development of multiple web applications'
            }
          ]
        }
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        password: 'password123',
        role: 'student',
        profile: {
          bio: 'UI/UX Designer learning to code',
          skills: ['Design', 'Figma', 'HTML', 'CSS']
        }
      },
      {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob@example.com',
        password: 'password123',
        role: 'student',
        profile: {
          bio: 'Data Science enthusiast',
          skills: ['Python', 'R', 'SQL', 'Machine Learning']
        }
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }

    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

const seedCategories = async () => {
  try {
    await Category.deleteMany({});
    
    const categories = [
      {
        name: 'Web Development',
        description: 'Learn to build modern web applications',
        icon: '🌐',
        color: '#3B82F6',
        sortOrder: 1
      },
      {
        name: 'Data Science',
        description: 'Master data analysis and machine learning',
        icon: '📊',
        color: '#10B981',
        sortOrder: 2
      },
      {
        name: 'Mobile Development',
        description: 'Create mobile apps for iOS and Android',
        icon: '📱',
        color: '#8B5CF6',
        sortOrder: 3
      },
      {
        name: 'Programming',
        description: 'Learn programming fundamentals',
        icon: '💻',
        color: '#F59E0B',
        sortOrder: 4
      },
      {
        name: 'Design',
        description: 'UI/UX and graphic design courses',
        icon: '🎨',
        color: '#EF4444',
        sortOrder: 5
      }
    ];

    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
    }

    console.log('✅ Categories seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  }
};

const seedCourses = async () => {
  try {
    await Course.deleteMany({});
    
    const instructor = await User.findOne({ role: 'instructor' });
    
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn full-stack web development from scratch. This comprehensive course covers everything from HTML and CSS to advanced JavaScript frameworks, backend development with Node.js, and database management. Perfect for beginners who want to become professional web developers.',
        shortDescription: 'Master HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp',
        instructor: instructor._id,
        category: 'web-development',
        level: 'beginner',
        duration: 40,
        price: 99.99,
        originalPrice: 199.99,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
        tags: ['web development', 'javascript', 'react', 'nodejs', 'html', 'css'],
        requirements: ['Basic computer skills', 'Internet connection', 'No prior programming experience required'],
        learningOutcomes: [
          'Build responsive websites with HTML and CSS',
          'Create dynamic web applications with JavaScript',
          'Develop full-stack applications with React and Node.js',
          'Deploy applications to production',
          'Understand modern development tools and workflows'
        ],
        isPublished: true,
        isFeatured: true,
        modules: [
          {
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the basics of web markup and styling',
            order: 1,
            isPublished: true,
            lessons: [
              {
                title: 'Introduction to HTML',
                description: 'Understanding HTML structure and elements',
                content: 'HTML (HyperText Markup Language) is the foundation of web development. In this lesson, you will learn about HTML structure, semantic elements, and how to create well-formed documents.',
                videoUrl: 'https://example.com/video1',
                duration: 30,
                order: 1,
                isFree: true,
                resources: [
                  {
                    title: 'HTML Cheat Sheet',
                    url: 'https://example.com/html-cheatsheet.pdf',
                    type: 'pdf'
                  }
                ]
              },
              {
                title: 'CSS Styling Basics',
                description: 'Learn how to style your HTML elements',
                content: 'CSS (Cascading Style Sheets) allows you to control the appearance of your HTML elements. Learn about selectors, properties, and responsive design.',
                videoUrl: 'https://example.com/video2',
                duration: 45,
                order: 2,
                isFree: false
              }
            ]
          },
          {
            title: 'JavaScript Essentials',
            description: 'Master JavaScript programming fundamentals',
            order: 2,
            isPublished: true,
            lessons: [
              {
                title: 'JavaScript Variables and Functions',
                description: 'Understanding variables, data types, and functions',
                content: 'Learn about JavaScript variables, different data types, and how to create and use functions effectively.',
                videoUrl: 'https://example.com/video3',
                duration: 50,
                order: 1,
                isFree: false
              }
            ]
          }
        ]
      },
      {
        title: 'React.js Complete Guide',
        description: 'Master React.js from basics to advanced concepts. Learn component-based architecture, state management, hooks, routing, and building real-world applications.',
        shortDescription: 'Learn React.js from scratch and build modern web applications',
        instructor: instructor._id,
        category: 'web-development',
        level: 'intermediate',
        duration: 25,
        price: 79.99,
        originalPrice: 149.99,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
        tags: ['react', 'javascript', 'frontend', 'components', 'hooks'],
        requirements: ['Basic JavaScript knowledge', 'HTML/CSS fundamentals'],
        learningOutcomes: [
          'Build reusable React components',
          'Manage state with hooks and context',
          'Implement routing with React Router',
          'Integrate with APIs and external libraries',
          'Deploy React applications'
        ],
        isPublished: true,
        isFeatured: true,
        modules: [
          {
            title: 'React Fundamentals',
            description: 'Learn the core concepts of React',
            order: 1,
            isPublished: true,
            lessons: [
              {
                title: 'Introduction to React',
                description: 'Understanding React and its benefits',
                content: 'React is a powerful JavaScript library for building user interfaces. Learn about its component-based architecture and virtual DOM.',
                videoUrl: 'https://example.com/react-intro',
                duration: 40,
                order: 1,
                isFree: true
              }
            ]
          }
        ]
      },
      {
        title: 'Python for Data Science',
        description: 'Learn Python programming for data analysis, visualization, and machine learning. Perfect for beginners who want to enter the data science field.',
        shortDescription: 'Master Python for data analysis and machine learning',
        instructor: instructor._id,
        category: 'data-science',
        level: 'beginner',
        duration: 35,
        price: 89.99,
        originalPrice: 179.99,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        tags: ['python', 'data science', 'pandas', 'numpy', 'matplotlib'],
        requirements: ['Basic programming knowledge helpful but not required'],
        learningOutcomes: [
          'Master Python programming fundamentals',
          'Analyze data with Pandas and NumPy',
          'Create data visualizations',
          'Build machine learning models',
          'Work with real-world datasets'
        ],
        isPublished: true,
        isFeatured: false,
        modules: [
          {
            title: 'Python Basics',
            description: 'Learn Python programming fundamentals',
            order: 1,
            isPublished: true,
            lessons: [
              {
                title: 'Python Introduction',
                description: 'Getting started with Python',
                content: 'Python is a versatile programming language perfect for data science. Learn about variables, data types, and basic operations.',
                videoUrl: 'https://example.com/python-intro',
                duration: 35,
                order: 1,
                isFree: true
              }
            ]
          }
        ]
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile applications using React Native. Learn to create iOS and Android apps with a single codebase.',
        shortDescription: 'Create mobile apps for iOS and Android with React Native',
        instructor: instructor._id,
        category: 'mobile-development',
        level: 'intermediate',
        duration: 30,
        price: 119.99,
        originalPrice: 199.99,
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
        tags: ['react native', 'mobile development', 'ios', 'android', 'javascript'],
        requirements: ['React.js knowledge', 'JavaScript ES6+'],
        learningOutcomes: [
          'Build cross-platform mobile apps',
          'Use React Native components and APIs',
          'Handle navigation and state management',
          'Deploy to app stores',
          'Integrate with native device features'
        ],
        isPublished: true,
        isFeatured: true,
        modules: [
          {
            title: 'React Native Setup',
            description: 'Setting up your development environment',
            order: 1,
            isPublished: true,
            lessons: [
              {
                title: 'Environment Setup',
                description: 'Install and configure React Native development tools',
                content: 'Learn how to set up your development environment for React Native development on both iOS and Android.',
                videoUrl: 'https://example.com/rn-setup',
                duration: 45,
                order: 1,
                isFree: true
              }
            ]
          }
        ]
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design. Create beautiful, functional designs that users love.',
        shortDescription: 'Master UI/UX design principles and create stunning interfaces',
        instructor: instructor._id,
        category: 'design',
        level: 'beginner',
        duration: 20,
        price: 69.99,
        originalPrice: 129.99,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
        tags: ['ui design', 'ux design', 'figma', 'design thinking', 'prototyping'],
        requirements: ['No prior design experience required'],
        learningOutcomes: [
          'Understand design principles and psychology',
          'Create wireframes and prototypes',
          'Design user-friendly interfaces',
          'Use design tools like Figma',
          'Conduct user research and testing'
        ],
        isPublished: true,
        isFeatured: false,
        modules: [
          {
            title: 'Design Principles',
            description: 'Learn the fundamental principles of good design',
            order: 1,
            isPublished: true,
            lessons: [
              {
                title: 'Introduction to Design',
                description: 'Understanding what makes good design',
                content: 'Learn about the fundamental principles of design including typography, color theory, and layout.',
                videoUrl: 'https://example.com/design-intro',
                duration: 30,
                order: 1,
                isFree: true
              }
            ]
          }
        ]
      }
    ];

    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
    }

    console.log('✅ Courses seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
  }
};

const seedEnrollments = async () => {
  try {
    const students = await User.find({ role: 'student' });
    const courses = await Course.find({ isPublished: true });

    for (const student of students) {
      // Enroll each student in 2-3 random courses
      const randomCourses = courses.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
      
      for (const course of randomCourses) {
        if (!student.isEnrolledInCourse(course._id)) {
          await student.enrollInCourse(course._id);
          
          // Set random progress
          const enrollment = student.enrolledCourses.find(e => e.course.toString() === course._id.toString());
          if (enrollment) {
            enrollment.progress = Math.floor(Math.random() * 100);
            enrollment.lastAccessed = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
            await student.save();
          }
        }
      }
    }

    console.log('✅ Enrollments seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding enrollments:', error);
  }
};

const seedReviews = async () => {
  try {
    await Review.deleteMany({});
    
    const students = await User.find({ role: 'student' });
    const courses = await Course.find({ isPublished: true });

    const reviews = [
      {
        rating: 5,
        title: 'Excellent Course!',
        comment: 'This course exceeded my expectations. The instructor explains everything clearly and the projects are very practical.',
        isVerified: true
      },
      {
        rating: 4,
        title: 'Great Learning Experience',
        comment: 'Very comprehensive course with good examples. Would recommend to anyone starting their journey.',
        isVerified: true
      },
      {
        rating: 5,
        title: 'Perfect for Beginners',
        comment: 'As someone with no prior experience, this course was perfect. The step-by-step approach made learning easy.',
        isVerified: true
      },
      {
        rating: 4,
        title: 'Good Content',
        comment: 'The course content is well-structured and the instructor is knowledgeable. Some sections could be more detailed.',
        isVerified: true
      },
      {
        rating: 5,
        title: 'Highly Recommended',
        comment: 'This course helped me land my first developer job. The practical projects were exactly what I needed.',
        isVerified: true
      }
    ];

    for (const course of courses) {
      const enrolledStudents = students.filter(student => student.isEnrolledInCourse(course._id));
      
      // Add 2-4 reviews per course
      const numReviews = Math.floor(Math.random() * 3) + 2;
      const selectedStudents = enrolledStudents.sort(() => 0.5 - Math.random()).slice(0, numReviews);
      
      for (const student of selectedStudents) {
        const reviewData = reviews[Math.floor(Math.random() * reviews.length)];
        const review = new Review({
          user: student._id,
          course: course._id,
          ...reviewData
        });
        await review.save();
        
        // Update course rating
        await course.addReview(student._id, reviewData.rating, reviewData.comment);
      }
    }

    console.log('✅ Reviews seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
  }
};

const seedNotifications = async () => {
  try {
    await Notification.deleteMany({});
    
    const users = await User.find();
    const courses = await Course.find({ isPublished: true });

    const notificationTypes = [
      {
        type: 'course_enrollment',
        title: 'Welcome to Your New Course!',
        message: 'You have successfully enrolled in a new course. Start learning today!'
      },
      {
        type: 'course_completion',
        title: 'Congratulations! 🎉',
        message: 'You have completed a course. Great job on your learning journey!'
      },
      {
        type: 'new_lesson',
        title: 'New Lesson Available',
        message: 'A new lesson has been added to one of your enrolled courses.'
      },
      {
        type: 'system_announcement',
        title: 'Platform Update',
        message: 'We have added new features to enhance your learning experience.'
      }
    ];

    for (const user of users) {
      // Create 3-5 random notifications per user
      const numNotifications = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numNotifications; i++) {
        const notificationData = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const course = courses[Math.floor(Math.random() * courses.length)];
        
        const notification = new Notification({
          user: user._id,
          type: notificationData.type,
          title: notificationData.title,
          message: notificationData.message,
          data: {
            courseId: course._id
          },
          isRead: Math.random() > 0.5,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last week
        });
        
        await notification.save();
      }
    }

    console.log('✅ Notifications seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
  }
};

const seedData = async () => {
  try {
    await connectDB();
    await seedUsers();
    await seedCategories();
    await seedCourses();
    await seedEnrollments();
    await seedReviews();
    await seedNotifications();
    console.log('🎉 All data seeded successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log('- Users: 5 (1 admin, 1 instructor, 3 students)');
    console.log('- Categories: 5');
    console.log('- Courses: 5 (all published)');
    console.log('- Enrollments: Random enrollments for students');
    console.log('- Reviews: 2-4 reviews per course');
    console.log('- Notifications: 3-5 notifications per user');
    console.log('\n🔑 Test Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Instructor: jane@example.com / password123');
    console.log('Student: john@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();