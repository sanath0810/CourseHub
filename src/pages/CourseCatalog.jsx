import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { getCourses } from '../utils/mockData';
import { Card, CardContent } from '../components/Card';
import { getCourseLevelColor } from '../utils/helpers';

export const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    'Web Development', 'Data Science', 'Design', 'Business',
    'Marketing', 'Photography', 'Music', 'Language', 'Health', 'Other'
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-secondary-200">Course Library</span>
            </h1>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Discover thousands of high-quality courses from expert instructors.
              Advance your career and learn new skills at your own pace.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-gray-700 w-full justify-center"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                {(selectedCategory || selectedLevel) && (
                  <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Reset All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategory === category ? 'bg-primary-600 border-primary-600' : 'border-gray-300 group-hover:border-primary-400'}`}>
                          {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          name="category"
                          className="hidden"
                          checked={selectedCategory === category}
                          onChange={() => { setSelectedCategory(category === selectedCategory ? '' : category); setCurrentPage(1); }}
                        />
                        <span className={`text-sm ${selectedCategory === category ? 'text-primary-700 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLevel === level ? 'bg-primary-600 border-primary-600' : 'border-gray-300 group-hover:border-primary-400'}`}>
                          {selectedLevel === level && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          name="level"
                          className="hidden"
                          checked={selectedLevel === level}
                          onChange={() => { setSelectedLevel(level === selectedLevel ? '' : level); setCurrentPage(1); }}
                        />
                        <span className={`text-sm capitalize ${selectedLevel === level ? 'text-primary-700 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">Showing <span className="font-semibold text-gray-900">{courses.length}</span> courses</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Sort by:</span>
                    <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
                      <option>Most Popular</option>
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className="group border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden rounded-2xl bg-white h-full flex flex-col cursor-pointer"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                        <img
                          src={course.thumbnail || `https://source.unsplash.com/random/800x600?${course.category}`}
                          alt={course.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-3 right-3 z-20">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full bg-white/90 shadow-sm uppercase tracking-wide ${course.level === 'beginner' ? 'text-green-700' :
                              course.level === 'intermediate' ? 'text-blue-700' : 'text-purple-700'
                            }`}>
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 text-xs font-medium text-primary-600 uppercase tracking-wide">
                          <BookOpen className="w-3 h-3" />
                          {course.category}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                          <div className="flex items-center gap-2">
                            <img
                              src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.firstName}+${course.lastName}&background=random`}
                              alt={course.firstName}
                              className="w-6 h-6 rounded-full border border-gray-200"
                            />
                            <span className="text-xs font-medium text-gray-600">{course.firstName} {course.lastName}</span>
                          </div>
                          <div className="font-bold text-gray-900">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>

                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === i + 1
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                              : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  We couldn't find any courses matching your criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
