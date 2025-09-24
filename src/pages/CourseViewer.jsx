import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { getCourseById } from '../utils/mockData';
import { useProgress } from '../contexts/ProgressContext';
import toast from 'react-hot-toast';

export const CourseViewer = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const { markVideoCompleted, getCourseProgress, isVideoCompleted, isModuleCompleted } = useProgress();
  
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const autoCompletedRef = useRef(false);

  useEffect(() => {
    const courseData = getCourseById(courseId);
    setCourse(courseData);
  }, [courseId]);

  const progress = getCourseProgress(courseId);

  // Safely compute current module/lesson even when course is not yet loaded
  const modules = course?.modules || [];
  const currentModuleData = modules[currentModule] || { id: undefined, title: '', lessons: [] };
  const currentLessonData = currentModuleData?.lessons?.[currentLesson];

  // Find the first uncompleted lesson across all modules
  const findFirstUncompleted = () => {
    for (let m = 0; m < modules.length; m++) {
      const lessons = modules[m]?.lessons || [];
      for (let l = 0; l < lessons.length; l++) {
        if (!isVideoCompleted(courseId, modules[m].id, lessons[l].id)) {
          return { moduleIndex: m, lessonIndex: l };
        }
      }
    }
    return null;
  };

  // Find the next uncompleted lesson after the current one
  const findNextUncompleted = () => {
    // start from current position + 1
    for (let m = currentModule; m < modules.length; m++) {
      const startLesson = m === currentModule ? currentLesson + 1 : 0;
      const lessons = modules[m]?.lessons || [];
      for (let l = startLesson; l < lessons.length; l++) {
        if (!isVideoCompleted(courseId, modules[m].id, lessons[l].id)) {
          return { moduleIndex: m, lessonIndex: l };
        }
      }
    }
    return null;
  };

  // On course load, jump to first uncompleted lesson
  useEffect(() => {
    if (!course || modules.length === 0) return;
    const target = findFirstUncompleted();
    if (target) {
      setCurrentModule(target.moduleIndex);
      setCurrentLesson(target.lessonIndex);
      setExpandedModuleIndex(target.moduleIndex);
    } else {
      // default to first lesson if everything is completed
      setCurrentModule(0);
      setCurrentLesson(0);
      setExpandedModuleIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, course]);

  // Keep expanded panel in sync with the current module
  useEffect(() => {
    setExpandedModuleIndex(currentModule);
  }, [currentModule]);

  // Utility to extract YouTube ID from an embed URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    // handles https://www.youtube.com/embed/VIDEO_ID and other typical formats
    const match = url.match(/(?:embed\/|v=)([a-zA-Z0-9_-]{6,})/);
    return match ? match[1] : null;
  };

  // Load YouTube IFrame API once
  const loadYouTubeAPI = () => new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });

  // Initialize YT player when lesson changes
  useEffect(() => {
    setVideoEnded(false);
    autoCompletedRef.current = false;
    // Cleanup previous player
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
    const videoId = getYouTubeId(currentLessonData?.videoUrl);
    if (!videoId || !playerContainerRef.current) return;
    let isMounted = true;
    loadYouTubeAPI().then((YT) => {
      if (!isMounted || !playerContainerRef.current) return;
      playerRef.current = new YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          autoplay: 1
        },
        events: {
          onReady: () => {
            try { playerRef.current?.playVideo(); } catch {}
          },
          onStateChange: (event) => {
            // 0 => ended
            if (event.data === 0) {
              setVideoEnded(true);
              // Auto-complete and advance if not already completed for this lesson
              if (!autoCompletedRef.current && currentLessonData && currentModuleData) {
                autoCompletedRef.current = true;
                const already = isVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
                if (!already) {
                  markVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
                  toast.success('Video completed! 🎉');
                  const updatedProgress = getCourseProgress(courseId);
                  if (updatedProgress.courseCompleted && !showCongratulations) {
                    setShowCongratulations(true);
                    toast.success('🎊 Congratulations! You have completed this course! 🎊', {
                      duration: 6000,
                      style: { background: '#10B981', color: '#fff', fontSize: '16px', fontWeight: 'bold' },
                    });
                    return;
                  }
                  const next = findNextUncompleted();
                  if (next) {
                    setCurrentModule(next.moduleIndex);
                    setCurrentLesson(next.lessonIndex);
                    setVideoEnded(false);
                    toast('Auto-advancing to the next lesson ▶️', { duration: 2000 });
                  }
                }
              }
            }
          },
        },
      });
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLessonData?.videoUrl]);

  const handleVideoComplete = () => {
    if (!currentLessonData) return;

    const wasCompleted = isVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
    
    if (!wasCompleted) {
      markVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
      toast.success('Video completed! 🎉');
      
      // Check if this completion finished the course
      const updatedProgress = getCourseProgress(courseId);
      if (updatedProgress.courseCompleted && !showCongratulations) {
        setShowCongratulations(true);
        toast.success('🎊 Congratulations! You have completed this course! 🎊', {
          duration: 6000,
          style: {
            background: '#10B981',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        return; // do not auto-advance past completion
      }

      // Auto-advance to the next uncompleted lesson and autoplay
      const next = findNextUncompleted();
      if (next) {
        setCurrentModule(next.moduleIndex);
        setCurrentLesson(next.lessonIndex);
        setVideoEnded(false);
        toast('Auto-advancing to the next lesson ▶️', { duration: 2000 });
      }
    }
  };

  const navigateToLesson = (moduleIndex, lessonIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
  };

  const nextLesson = () => {
    const nextLessonIndex = currentLesson + 1;
    if (nextLessonIndex < currentModuleData.lessons.length) {
      setCurrentLesson(nextLessonIndex);
    } else {
      const nextModuleIndex = currentModule + 1;
      if (nextModuleIndex < course.modules.length) {
        setCurrentModule(nextModuleIndex);
        setCurrentLesson(0);
      }
    }
  };

  const previousLesson = () => {
    const prevLessonIndex = currentLesson - 1;
    if (prevLessonIndex >= 0) {
      setCurrentLesson(prevLessonIndex);
    } else {
      const prevModuleIndex = currentModule - 1;
      if (prevModuleIndex >= 0) {
        setCurrentModule(prevModuleIndex);
        setCurrentLesson(course.modules[prevModuleIndex].lessons.length - 1);
      }
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-900">{course?.title || 'Loading course...'}</h1>
            <div className="text-sm text-gray-600">
              {progress.completedVideos} of {progress.totalVideos} videos completed
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Progress: {progress.percentage}% • Modules completed: {progress.completedModules}/{progress.totalModules}
          </div>
          {progress.courseCompleted && (
            <div className="mt-2 text-sm font-semibold text-green-600">
              🎊 Course Completed! Congratulations! 🎊
            </div>
          )}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Course Content */}
          <div className="lg:col-span-9">
            <Card>
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="h-[45vh] md:h-[55vh] bg-black rounded-t-lg overflow-hidden">
                  {currentLessonData?.videoUrl ? (
                    <div ref={playerContainerRef} className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <p>{course ? 'Video not available' : 'Loading...'}</p>
                    </div>
                  )}
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {currentLessonData?.title || (course ? 'Select a lesson' : 'Loading...')}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {course && currentModuleData
                          ? `Module ${currentModule + 1}: ${currentModuleData?.title} • ${formatDuration(currentLessonData?.duration || 0)}`
                          : ''}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id) && (
                        <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                      )}
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        onClick={previousLesson}
                        disabled={!course || (currentModule === 0 && currentLesson === 0)}
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={handleVideoComplete}
                        disabled={!course || (!videoEnded && !isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id))}
                        className={`bg-green-600 hover:bg-green-700 ${(!course || (!videoEnded && !isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id))) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id)
                          ? 'Completed'
                          : (videoEnded ? 'Mark as Complete' : 'Watch till end to complete')}
                      </Button>
                      <Button
                        onClick={nextLesson}
                        disabled={
                          !course || (
                            currentModule === modules.length - 1 &&
                            currentLesson === (currentModuleData?.lessons?.length || 0) - 1
                          )
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Course Sidebar */}
          <div className="lg:col-span-3 ">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[90vh] overflow-y-auto">
                  {(modules).map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-gray-200 last:border-b-0 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          // expand this module and play the first lesson
                          setExpandedModuleIndex(moduleIndex);
                          setCurrentModule(moduleIndex);
                          setCurrentLesson(0);
                        }}
                        className="w-full text-left p-4 mb-2 bg-gray-200 rounded-lg hover:bg-gray-300 "
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Module {moduleIndex + 1}: {module.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {module.lessons.filter(les => isVideoCompleted(courseId, module.id, les.id)).length}
                              /{module.lessons.length} completed
                            </p>
                          </div>
                          {isModuleCompleted(courseId, module.id) && (
                            <span className="text-green-600 text-sm">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {module.lessons.length} videos
                        </p>
                      </button>
                      {expandedModuleIndex === moduleIndex && (
                        <div className="divide-y divide-gray-100">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className={`p-3 hover:bg-gray-50 transition-colors ${
                              currentModule === moduleIndex && currentLesson === lessonIndex
                                ? 'bg-blue-50 border-r-2 border-blue-600'
                                : ''
                            }`}>
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => navigateToLesson(moduleIndex, lessonIndex)}
                                  className="text-left"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatDuration(lesson.duration)}
                                    </p>
                                  </div>
                                </button>
                                <div className="flex items-center">
                                  {isVideoCompleted(courseId, module.id, lesson.id) && (
                                    <span className="text-green-600 text-sm">✓</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
