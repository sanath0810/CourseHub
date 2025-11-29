import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Users, TrendingUp, Clock, Award, Plus, Eye, Calendar,
  ArrowRight, MoreVertical, CheckCircle, PlayCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getMyEnrollments, getMyCourses } from '../utils/mockData';
import { formatDate, getProgressBgColor, getCourseLevelColor } from '../utils/helpers';

export const Dashboard = () => {
  const { user, isEducator, isStudent } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
    averageProgress: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchDashboardData = () => {
    setLoading(true);

    if (isEducator) {
      const coursesResponse = getMyCourses(user.id, { limit: 5 });
      setRecentCourses(coursesResponse.courses);

      const totalCourses = coursesResponse.pagination.total;
      const totalStudents = coursesResponse.courses.reduce((sum, course) => sum + course.enrollmentCount, 0);

      setStats({
        totalCourses,
        totalStudents,
        totalEnrollments: totalStudents,
        averageProgress: 75
      });
    } else if (isStudent) {
      const enrollmentsResponse = getMyEnrollments(user.id, { limit: 5 });
      setMyEnrollments(enrollmentsResponse.enrollments);

      const totalEnrollments = enrollmentsResponse.pagination.total;
      const averageProgress = enrollmentsResponse.enrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / enrollmentsResponse.enrollments.length || 0;

      setStats({
        totalCourses: totalEnrollments,
        totalStudents: 0,
        totalEnrollments,
        averageProgress
      });
    }
    setLoading(false);
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">+2.5%</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your {isEducator ? 'courses' : 'learning'} today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
            View Reports
          </button>
          {isEducator ? (
            <Link to="/instructor/courses/create" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Course
            </Link>
          ) : (
            <Link to="/courses" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Browse Courses
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {isEducator ? (
          <>
            <StatCard title="Total Courses" value={stats.totalCourses} icon={BookOpen} color="bg-blue-500" />
            <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="bg-green-500" />
            <StatCard title="Total Enrollments" value={stats.totalEnrollments} icon={TrendingUp} color="bg-purple-500" />
            <StatCard title="Avg. Progress" value={`${Math.round(stats.averageProgress)}%`} icon={Award} color="bg-orange-500" />
          </>
        ) : (
          <>
            <StatCard title="Enrolled Courses" value={stats.totalCourses} icon={BookOpen} color="bg-blue-500" />
            <StatCard title="Completed" value={Math.round(stats.totalCourses * stats.averageProgress / 100)} icon={CheckCircle} color="bg-green-500" />
            <StatCard title="In Progress" value={stats.totalCourses - Math.round(stats.totalCourses * stats.averageProgress / 100)} icon={Clock} color="bg-orange-500" />
            <StatCard title="Avg. Progress" value={`${Math.round(stats.averageProgress)}%`} icon={TrendingUp} color="bg-purple-500" />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Courses List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {isEducator ? 'Recent Courses' : 'My Courses'}
              </h2>
              <Link to={isEducator ? "/instructor/courses" : "/courses"} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {isEducator ? (
                recentCourses.length > 0 ? (
                  recentCourses.map((course) => (
                    <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <BookOpen className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.enrollmentCount} students</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration || '4 weeks'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/instructor/courses/${course.id}/edit`} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                    <p className="text-gray-500 mb-6">Create your first course to get started</p>
                    <Link to="/instructor/courses/create" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                      Create Course
                    </Link>
                  </div>
                )
              ) : (
                myEnrollments.length > 0 ? (
                  myEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg flex-shrink-0">
                            {enrollment.title.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{enrollment.title}</h3>
                            <p className="text-sm text-gray-500">Instructor: {enrollment.firstName} {enrollment.lastName}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${getCourseLevelColor(enrollment.level)}`}>
                          {enrollment.level}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">{Math.round(enrollment.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProgressBgColor(enrollment.progress)}`}
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link
                          to={`/course/${enrollment.courseId}/learn`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                          Continue Learning <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No enrollments yet</h3>
                    <p className="text-gray-500 mb-6">Browse our catalog to find your first course</p>
                    <Link to="/courses" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                      Browse Courses
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions / Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {isEducator ? 'Quick Actions' : 'Learning Activity'}
            </h2>

            {isEducator ? (
              <div className="space-y-3">
                <Link to="/instructor/courses/create" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Create New Course</h3>
                    <p className="text-xs text-gray-500">Add a new course to your catalog</p>
                  </div>
                </Link>
                <Link to="/instructor/courses" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Manage Courses</h3>
                    <p className="text-xs text-gray-500">Edit content and view students</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-0.5 h-full bg-gray-100"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-600 ring-4 ring-white"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-xs text-gray-400 mb-1">Today, 10:30 AM</p>
                    <h4 className="text-sm font-semibold text-gray-900">Completed "React Basics"</h4>
                    <p className="text-xs text-gray-500">You finished the first module!</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-0.5 h-full bg-gray-100"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-white"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-xs text-gray-400 mb-1">Yesterday</p>
                    <h4 className="text-sm font-semibold text-gray-900">Enrolled in "UX Design"</h4>
                    <p className="text-xs text-gray-500">Started a new learning path</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Motivation Card */}
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Keep it up! 🔥</h3>
              <p className="text-primary-100 text-sm mb-4">
                You're on a 3-day streak. Complete one more lesson to reach your weekly goal.
              </p>
              <button className="w-full py-2 bg-white text-primary-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
