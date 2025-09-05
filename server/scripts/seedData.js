import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-king');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample users data
const usersData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: 'student',
    isEmailVerified: true,
    profile: {
      bio: 'Passionate learner and aspiring developer',
      phone: '+1234567890',
      gender: 'male'
    }
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    role: 'student',
    isEmailVerified: true,
    profile: {
      bio: 'Data science enthusiast and machine learning practitioner',
      phone: '+1234567891',
      gender: 'female'
    }
  },
  {
    firstName: 'Dr. Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    password: 'password123',
    role: 'instructor',
    isEmailVerified: true,
    profile: {
      bio: 'Senior Software Engineer with 10+ years of experience in full-stack development',
      phone: '+1234567892',
      gender: 'male'
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    password: 'password123',
    role: 'instructor',
    isEmailVerified: true,
    profile: {
      bio: 'AI/ML Expert and Research Scientist specializing in deep learning',
      phone: '+1234567893',
      gender: 'female'
    }
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@lms-king.com',
    password: 'admin123',
    role: 'admin',
    isEmailVerified: true,
    profile: {
      bio: 'System Administrator for LMS-kinG Platform',
      phone: '+1234567894',
      gender: 'other'
    }
  }
];

// Sample courses data
const coursesData = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and MongoDB. Perfect for beginners who want to become professional web developers.',
    shortDescription: 'Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB',
    category: 'web-development',
    level: 'beginner',
    language: 'English',
    duration: 120,
    price: 199,
    originalPrice: 299,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
    ],
    tags: ['web-development', 'javascript', 'react', 'nodejs', 'mongodb'],
    requirements: [
      'Basic computer skills',
      'No programming experience required',
      'Willingness to learn'
    ],
    learningOutcomes: [
      'Build responsive websites with HTML and CSS',
      'Create interactive web applications with JavaScript',
      'Develop modern web apps with React',
      'Build backend APIs with Node.js and Express',
      'Work with databases using MongoDB'
    ],
    isPublished: true,
    isFeatured: true,
    modules: [
      {
        title: 'Introduction to Web Development',
        description: 'Get started with web development fundamentals',
        order: 1,
        isPublished: true,
        lessons: [
          {
            title: 'What is Web Development?',
            description: 'Introduction to web development concepts',
            content: 'Web development is the process of building websites and web applications...',
            duration: 15,
            order: 1,
            isFree: true
          },
          {
            title: 'Setting up Development Environment',
            description: 'Install and configure necessary tools',
            content: 'We will set up VS Code, Node.js, and other essential tools...',
            duration: 20,
            order: 2,
            isFree: true
          }
        ]
      },
      {
        title: 'HTML Fundamentals',
        description: 'Learn HTML structure and semantic elements',
        order: 2,
        isPublished: true,
        lessons: [
          {
            title: 'HTML Basics',
            description: 'Understanding HTML structure and tags',
            content: 'HTML (HyperText Markup Language) is the foundation of web pages...',
            duration: 25,
            order: 1,
            isFree: true
          },
          {
            title: 'HTML Forms and Input',
            description: 'Creating interactive forms',
            content: 'Forms are essential for user interaction on websites...',
            duration: 30,
            order: 2,
            isFree: false
          }
        ]
      }
    ]
  },
  {
    title: 'Advanced Machine Learning & AI',
    description: 'Dive deep into machine learning algorithms, neural networks, and artificial intelligence. This advanced course covers supervised and unsupervised learning, deep learning, computer vision, and natural language processing.',
    shortDescription: 'Master advanced machine learning algorithms, neural networks, and AI applications',
    category: 'data-science',
    level: 'advanced',
    language: 'English',
    duration: 150,
    price: 299,
    originalPrice: 399,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    ],
    tags: ['machine-learning', 'ai', 'python', 'tensorflow', 'neural-networks'],
    requirements: [
      'Strong programming background in Python',
      'Basic understanding of statistics and linear algebra',
      'Previous experience with data analysis'
    ],
    learningOutcomes: [
      'Implement various machine learning algorithms',
      'Build and train neural networks',
      'Work with computer vision and NLP',
      'Deploy ML models to production',
      'Understand AI ethics and best practices'
    ],
    isPublished: true,
    isFeatured: true,
    modules: [
      {
        title: 'Introduction to Machine Learning',
        description: 'Fundamentals of machine learning',
        order: 1,
        isPublished: true,
        lessons: [
          {
            title: 'Supervised vs Unsupervised Learning',
            description: 'Understanding different types of ML',
            content: 'Machine learning can be broadly categorized into supervised and unsupervised learning...',
            duration: 20,
            order: 1,
            isFree: true
          },
          {
            title: 'Data Preprocessing',
            description: 'Preparing data for ML algorithms',
            content: 'Data preprocessing is crucial for successful machine learning...',
            duration: 25,
            order: 2,
            isFree: false
          }
        ]
      }
    ]
  },
  {
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native. Learn to create iOS and Android apps with a single codebase, including navigation, state management, and native features integration.',
    shortDescription: 'Create cross-platform mobile apps with React Native for iOS and Android',
    category: 'mobile-development',
    level: 'intermediate',
    language: 'English',
    duration: 100,
    price: 249,
    originalPrice: 349,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
    ],
    tags: ['react-native', 'mobile-development', 'javascript', 'ios', 'android'],
    requirements: [
      'Basic knowledge of JavaScript and React',
      'Understanding of mobile app concepts',
      'Mac for iOS development (optional)'
    ],
    learningOutcomes: [
      'Build cross-platform mobile apps',
      'Implement navigation and state management',
      'Integrate native device features',
      'Deploy apps to app stores',
      'Optimize app performance'
    ],
    isPublished: true,
    isFeatured: false,
    modules: [
      {
        title: 'React Native Fundamentals',
        description: 'Getting started with React Native',
        order: 1,
        isPublished: true,
        lessons: [
          {
            title: 'Setting up React Native Environment',
            description: 'Install and configure React Native development environment',
            content: 'We will set up the React Native development environment...',
            duration: 30,
            order: 1,
            isFree: true
          }
        ]
      }
    ]
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Learn professional UI/UX design principles, tools, and workflows. Create beautiful, user-friendly interfaces and understand the psychology behind great user experiences.',
    shortDescription: 'Master UI/UX design principles and create stunning user interfaces',
    category: 'design',
    level: 'beginner',
    language: 'English',
    duration: 80,
    price: 179,
    originalPrice: 249,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800'
    ],
    tags: ['ui-design', 'ux-design', 'figma', 'adobe-xd', 'user-research'],
    requirements: [
      'Basic computer skills',
      'Creative mindset',
      'Access to design software (Figma, Adobe XD)'
    ],
    learningOutcomes: [
      'Understand UI/UX design principles',
      'Create wireframes and prototypes',
      'Conduct user research and testing',
      'Design responsive interfaces',
      'Work with design systems'
    ],
    isPublished: true,
    isFeatured: false,
    modules: [
      {
        title: 'Design Fundamentals',
        description: 'Core principles of good design',
        order: 1,
        isPublished: true,
        lessons: [
          {
            title: 'Principles of Good Design',
            description: 'Understanding fundamental design principles',
            content: 'Good design follows certain principles that make interfaces intuitive and beautiful...',
            duration: 20,
            order: 1,
            isFree: true
          }
        ]
      }
    ]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get instructor IDs
    const instructors = createdUsers.filter(user => user.role === 'instructor');
    const students = createdUsers.filter(user => user.role === 'student');

    // Create courses with instructor references
    console.log('📚 Creating courses...');
    const coursesWithInstructors = coursesData.map((course, index) => ({
      ...course,
      instructor: instructors[index % instructors.length]._id
    }));

    const createdCourses = await Course.insertMany(coursesWithInstructors);
    console.log(`✅ Created ${createdCourses.length} courses`);

    // Enroll some students in courses
    console.log('🎓 Enrolling students in courses...');
    for (const student of students) {
      const randomCourses = createdCourses
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);

      for (const course of randomCourses) {
        await student.enrollInCourse(course._id);
        await course.incrementEnrollment();
      }
    }
    console.log('✅ Enrolled students in courses');

    // Add some reviews
    console.log('⭐ Adding reviews...');
    for (const course of createdCourses) {
      const enrolledStudents = students.filter(student => 
        student.isEnrolledInCourse(course._id)
      );

      for (const student of enrolledStudents.slice(0, 2)) {
        const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
        const comments = [
          'Excellent course! Very well structured and easy to follow.',
          'Great instructor and comprehensive content.',
          'Learned a lot from this course. Highly recommended!',
          'Perfect for beginners. Step-by-step explanations.',
          'Amazing course with practical examples.'
        ];
        
        await course.addReview(
          student._id, 
          rating, 
          comments[Math.floor(Math.random() * comments.length)]
        );
      }
    }
    console.log('✅ Added reviews');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Courses: ${createdCourses.length}`);
    console.log(`- Instructors: ${instructors.length}`);
    console.log(`- Students: ${students.length}`);
    
    console.log('\n🔑 Test Accounts:');
    console.log('Admin: admin@lms-king.com / admin123');
    console.log('Instructor: michael.johnson@example.com / password123');
    console.log('Student: john.doe@example.com / password123');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding
connectDB().then(() => {
  seedDatabase();
});
