// src/pages/LiveClasses.jsx
import { useMemo, useState } from "react";

const styles = {
  brandBlue: "#18457A",
  liveRed: "#D14343",
};

function LiveBadge() {
  return (
    <span
      className="pointer-events-none select-none inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] leading-none animate-pulse"
      style={{ borderColor: styles.liveRed, color: styles.liveRed }}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
      </svg>
      LIVE
    </span>
  );
}

function LiveVideoPlayer({ title, author, viewers, videoUrl, thumbnail, isLive = true }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative group">
      <div className="relative">
        <div
          className="h-44 sm:h-48 w-full rounded-xl bg-slate-200 border overflow-hidden"
          style={{ borderColor: isLive ? styles.liveRed : "#e5e7eb" }}
        >
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

            {/* Live Viewers Count */}
            {isLive && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded z-10">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {viewers} watching
                </div>
              </div>
            )}

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

        {/* AI-Powered Features Indicator */}
        {isLive && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              AI Powered
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">{title}</p>
        <p className="text-[11px] text-slate-600 -mt-0.5">Drive deep into machine learning</p>
        <p className="text-[11px] text-slate-500 mt-1">By {author}</p>
        
        {/* Live Status Info */}
        {isLive && (
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Live Now
            </span>
            <span>•</span>
            <span>{viewers} viewers</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveClasses() {
  // Real machine learning tutorial videos with educational content
  const items = useMemo(
    () => [
      {
        id: 1,
        title: "Stanford CS229: Machine Learning (Lecture 1)",
        author: "Stanford Online",
        viewers: "1.8K",
        thumbnail: "https://i.ytimg.com/vi/jGwO_UgTS7I/hqdefault.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        isLive: true
      },
      {
        id: 2,
        title: "Intro to Machine Learning (MIT 6.036)",
        author: "MIT OpenCourseWare",
        viewers: "1.2K",
        thumbnail: "https://i.ytimg.com/vi/i_LwzRVP7bg/hqdefault.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isLive: true
      },
      {
        id: 3,
        title: "ML for Everybody – Full Course",
        author: "freeCodeCamp.org",
        viewers: "3.4K",
        thumbnail: "https://i.ytimg.com/vi/i_LwzRVP7bg/hqdefault.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isLive: true
      },
      {
        id: 4,
        title: "Neural Networks for ML (Coursera)",
        author: "Geoff Hinton",
        viewers: "924",
        thumbnail: "https://archive.org/services/img/academictorrents_743c16a18756557a67478a7570baf24a59f9cda6",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isLive: false
      }
    ],
    []
  );

  const liveClasses = items.filter(item => item.isLive);
  const upcomingClasses = items.filter(item => !item.isLive);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: styles.brandBlue }}>
        Live Classes
      </h1>

      {/* AI Features Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">AI-Powered Learning Experience</h3>
            <p className="text-sm text-blue-700">Real-time transcription, smart Q&A, and personalized learning insights</p>
          </div>
        </div>
      </div>

      {/* Live Now Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          Live Now ({liveClasses.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {liveClasses.map((c) => (
            <LiveVideoPlayer 
              key={c.id} 
              title={c.title} 
              author={c.author}
              viewers={c.viewers}
              thumbnail={c.thumbnail}
              videoUrl={c.videoUrl}
              isLive={c.isLive}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Classes */}
      {upcomingClasses.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Upcoming Classes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingClasses.map((c) => (
              <LiveVideoPlayer 
                key={c.id} 
                title={c.title} 
                author={c.author}
                viewers={c.viewers}
                thumbnail={c.thumbnail}
                videoUrl={c.videoUrl}
                isLive={c.isLive}
              />
            ))}
          </div>
        </div>
      )}

      {/* AI Features List */}
      <div className="mt-12 bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">AI-Powered Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Real-time Transcription</h4>
              <p className="text-sm text-slate-600">Automatic speech-to-text with 99% accuracy</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Smart Q&A</h4>
              <p className="text-sm text-slate-600">AI-powered question answering and explanations</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Learning Analytics</h4>
              <p className="text-sm text-slate-600">Personalized insights and progress tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
