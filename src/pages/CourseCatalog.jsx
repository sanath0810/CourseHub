import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { getCourses } from '../utils/mockData';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { formatDate, getCourseLevelColor } from '../utils/helpers';
import toast from 'react-hot-toast';

export const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    'Web Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music',
    'Language',
    'Health',
    'Other'
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm, selectedCategory, selectedLevel]);

  const fetchCourses = () => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: 12,
      ...(searchTerm && { search: searchTerm }),
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedLevel && { level: selectedLevel })
    };

    const response = getCourses(params);
    setCourses(response.courses);
    setTotalPages(response.pagination.pages);
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level === selectedLevel ? '' : level);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Amazing Courses
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore thousands of courses from expert instructors and start your learning journey today.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Level</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => handleLevelChange(level)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                          selectedLevel === level
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {(searchTerm || selectedCategory || selectedLevel) && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <div className="relative">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                            loading="lazy"
                            data-fallback-step="0"
                            onError={(e) => {
                              const el = e.currentTarget;
                              const step = parseInt(el.dataset.fallbackStep || '0', 10);
                              const kw = encodeURIComponent(`${course.title} ${course.category}`);
                              if (step === 0) {
                                el.src = `https://loremflickr.com/640/360/${kw}?lock=${course.id}`;
                                el.dataset.fallbackStep = '1';
                              } else if (step === 1) {
                                el.src = `https://picsum.photos/seed/course-${course.id}/640/360`;
                                el.dataset.fallbackStep = '2';
                              } else if (step === 2) {
                                const text = encodeURIComponent(course.title || 'Course');
                                el.src = `https://placehold.co/640x360?text=${text}`;
                                el.dataset.fallbackStep = '3';
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-36 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                            <BookOpen className="h-12 w-12 text-white" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCourseLevelColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {course.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.enrollmentCount} students</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={course.instructorAvatar || '/default-avatar.png'}
                              alt={course.firstName}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600">
                              {course.firstName} {course.lastName}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {course.price === 0 ? 'Free' : `$${course.price}`}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to={`/courses/${course.id}`}
                            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors block text-center"
                          >
                            View Course
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? 'primary' : 'outline'}
                          onClick={() => setCurrentPage(i + 1)}
                          className="w-10"
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all courses.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
