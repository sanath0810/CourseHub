import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Play, 
  CheckCircle,
  User,
  Calendar,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getCourseById } from '../utils/mockData';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { formatDate, getCourseLevelColor, formatDuration } from '../utils/helpers';
import toast from 'react-hot-toast';

export const CourseDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated, isStudent } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
    if (isAuthenticated && isStudent) {
      checkEnrollment();
    }
  }, [id, isAuthenticated]);

  const fetchCourse = () => {
    setLoading(true);
    const courseData = getCourseById(id);
    setCourse(courseData);
    setLoading(false);
  };

  const checkEnrollment = () => {
    // Mock enrollment check - in real app, this would check localStorage or API
    const savedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollment = savedEnrollments.find(e => e.courseId == id);
    setEnrolled(!!enrollment);
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to enroll in courses');
      return;
    }

    setEnrolling(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock enrollment
    const savedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const newEnrollment = {
      courseId: parseInt(id),
      studentId: user.id,
      enrolledAt: new Date().toISOString(),
      progress: 0
    };
    savedEnrollments.push(newEnrollment);
    localStorage.setItem('enrollments', JSON.stringify(savedEnrollments));
    
    setEnrolled(true);
    toast.success('Successfully enrolled in course!');
    setEnrolling(false);
  };

  const calculateTotalDuration = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce((total, module) => {
      return total + module.lessons.reduce((moduleTotal, lesson) => {
        return moduleTotal + (lesson.duration || 0);
      }, 0);
    }, 0);
  };

  const getTotalLessons = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/courses" className="hover:text-gray-900">Courses</Link>
            <span>/</span>
            <span className="text-gray-900">{course.title}</span>
          </nav>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{course.firstName} {course.lastName}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.enrollmentCount} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDuration(calculateTotalDuration())}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{getTotalLessons()} lessons</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCourseLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="ml-8">
              {course.instructorAvatar ? (
                <img
                  src={course.instructorAvatar}
                  alt={course.firstName}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg font-medium">
                  {course.firstName?.charAt(0)}{course.lastName?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* Course Thumbnail */}
            {course.thumbnail && (
              <div className="mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Course Description */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">About this course</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Course curriculum</h2>
                <p className="text-sm text-gray-600">
                  {course.modules.length} modules • {getTotalLessons()} lessons • {formatDuration(calculateTotalDuration())} total
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg">
                      <div className="p-4 bg-gray-50 rounded-t-lg">
                        <h3 className="font-medium text-gray-900">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center">
                                <Play className="h-4 w-4 text-gray-400 mr-3" />
                                <span className="text-sm text-gray-900">
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                                {lesson.duration && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({formatDuration(lesson.duration)})
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  <p className="text-sm text-gray-600">One-time payment</p>
                </div>

                {enrolled ? (
                  <div className="space-y-4">
                    <Link to={`/course/${course.id}/learn`} className="block">
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-green-600 font-medium">You're enrolled!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isAuthenticated ? (
                      <Button
                        className="w-full"
                        onClick={handleEnroll}
                        loading={enrolling}
                        disabled={enrolling}
                      >
                        {course.price === 0 ? 'Enroll for Free' : `Enroll for $${course.price}`}
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Link to="/login" className="block">
                          <Button className="w-full">
                            Sign in to Enroll
                          </Button>
                        </Link>
                        <p className="text-xs text-gray-600 text-center">
                          Already have an account?{' '}
                          <Link to="/login" className="text-primary-600 hover:text-primary-500">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">What you'll get</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Lifetime access
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Mobile and desktop access
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Instructor support
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Course includes</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-primary-500 mr-2" />
                      {getTotalLessons()} lessons
                    </li>
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 text-primary-500 mr-2" />
                      {formatDuration(calculateTotalDuration())} of content
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 text-primary-500 mr-2" />
                      {course.modules.length} modules
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
