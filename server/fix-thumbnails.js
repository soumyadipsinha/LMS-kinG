import mongoose from 'mongoose';
import Course from './models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

const fixThumbnails = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-king');
    console.log('Connected to MongoDB');

    // Find courses with broken thumbnail URLs
    const courses = await Course.find({
      $or: [
        { thumbnail: { $regex: /placehold\.co/ } },
        { thumbnail: { $regex: /FFFFFF/ } },
        { thumbnail: { $regex: /text=React/ } }
      ]
    });

    console.log(`Found ${courses.length} courses with broken thumbnails`);

    // Update each course with a working placeholder
    for (const course of courses) {
      const newThumbnail = `https://picsum.photos/600/400?random=${course._id}`;
      
      await Course.findByIdAndUpdate(course._id, {
        thumbnail: newThumbnail
      });
      
      console.log(`Updated course: ${course.title} with new thumbnail`);
    }

    console.log('All thumbnails fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing thumbnails:', error);
    process.exit(1);
  }
};

fixThumbnails();
