import { useMemo, useState } from "react";

const styles = {
  brandBlue: "#18457A",
  accentGreen: "#10B981",
};

function RecordingCard({ title, subtitle, author, duration, thumbnail, videoUrl, views, date }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
          {/* Video Player */}
          <div className="relative w-full h-full">
            {isPlaying ? (
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img 
                  src={thumbnail} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button
                    onClick={handlePlayClick}
                    className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all hover:scale-110"
                  >
                    <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>

            {/* Stop Button when playing */}
            {isPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90 transition-all z-10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{title}</h3>
        <p className="text-xs text-gray-600 mb-2">{subtitle}</p>
        <p className="text-xs text-gray-500 mb-3">By {author}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{views} views</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default function RecordingClasses() {
  const recordings = useMemo(
    () => [
      {
        id: 1,
        title: "Introduction to Machine Learning Fundamentals",
        subtitle: "Learn the basics of ML algorithms and concepts",
        author: "Dr. Sarah Johnson",
        duration: "45:32",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        views: "2.1K",
        date: "2 days ago"
      },
      {
        id: 2,
        title: "Deep Learning with Neural Networks",
        subtitle: "Advanced concepts in neural network architecture",
        author: "Prof. Michael Chen",
        duration: "1:12:15",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        views: "1.8K",
        date: "1 week ago"
      },
      {
        id: 3,
        title: "Data Science and Analytics Workshop",
        subtitle: "Practical data analysis and visualization techniques",
        author: "Emily Rodriguez",
        duration: "38:45",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        views: "3.2K",
        date: "3 days ago"
      },
      {
        id: 4,
        title: "Python Programming for ML",
        subtitle: "Essential Python skills for machine learning",
        author: "Alex Thompson",
        duration: "52:18",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        views: "4.5K",
        date: "5 days ago"
      },
      {
        id: 5,
        title: "Natural Language Processing Basics",
        subtitle: "Understanding text processing and analysis",
        author: "Dr. Lisa Wang",
        duration: "41:27",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        views: "1.9K",
        date: "1 week ago"
      },
      {
        id: 6,
        title: "Computer Vision Fundamentals",
        subtitle: "Image processing and recognition techniques",
        author: "Prof. David Kim",
        duration: "1:05:42",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        views: "2.7K",
        date: "4 days ago"
      },
      {
        id: 7,
        title: "Reinforcement Learning Overview",
        subtitle: "Introduction to RL algorithms and applications",
        author: "Dr. Robert Smith",
        duration: "48:33",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        views: "1.6K",
        date: "6 days ago"
      },
      {
        id: 8,
        title: "Big Data and Distributed Computing",
        subtitle: "Handling large-scale data processing",
        author: "Maria Garcia",
        duration: "56:21",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        views: "2.3K",
        date: "2 weeks ago"
      }
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: styles.brandBlue }}>
          Recording Classes
        </h1>
        <p className="text-gray-600">Access recorded lectures and workshops anytime, anywhere</p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{recordings.length}</div>
            <div className="text-sm text-blue-700">Total Recordings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">18.1K</div>
            <div className="text-sm text-blue-700">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">8</div>
            <div className="text-sm text-blue-700">Instructors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">45+ hrs</div>
            <div className="text-sm text-blue-700">Content Hours</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
          All Recordings
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
          Machine Learning
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
          Deep Learning
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
          Data Science
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
          Programming
        </button>
      </div>

      {/* Recordings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            title={recording.title}
            subtitle={recording.subtitle}
            author={recording.author}
            duration={recording.duration}
            thumbnail={recording.thumbnail}
            videoUrl={recording.videoUrl}
            views={recording.views}
            date={recording.date}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Load More Recordings
        </button>
      </div>
    </section>
  );
}
