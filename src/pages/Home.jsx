import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Users, Award, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getCourses } from '../utils/mockData';
import { Card, CardContent } from '../components/Card';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Grab first page of courses and pick top 6 as featured
    const { courses } = getCourses({ page: 1, limit: 6 });
    setFeatured(courses);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">CourseHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Welcome, {user.firstName}!</span>
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover thousands of courses from expert instructors. Build new skills, advance your career, and achieve your learning goals with our comprehensive online education platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Browse Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Start Learning Today
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Categories</h2>
              <p className="text-gray-600">Explore trending topics across CourseHub</p>
            </div>
            <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Web Development','Data Science','Design','Marketing','Cloud','DevOps'].map((cat) => (
              <Link
                key={cat}
                to={`/courses?category=${encodeURIComponent(cat)}`}
                className="px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-sm font-medium text-gray-700 text-center"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Courses</h2>
              <p className="text-gray-600">Handpicked courses to get you started</p>
            </div>
            <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">Browse all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover"
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
                    <div className="w-full h-40 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-700 capitalize">
                      {course.level}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <img
                        src={course.instructorAvatar || '/default-avatar.png'}
                        alt={course.firstName}
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      <span className="text-gray-600">{course.firstName} {course.lastName}</span>
                    </div>
                    <div className="font-semibold text-gray-900">{course.price === 0 ? 'Free' : `$${course.price}`}</div>
                  </div>
                  <div className="mt-4">
                    <Link to={`/courses/${course.id}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What learners say</h2>
            <p className="text-gray-600">Real feedback from our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Aisha', text: 'Amazing platform! The React course helped me land my first dev job.' },
              { name: 'Ravi', text: 'High quality content and great instructors. Loved the hands-on projects.' },
              { name: 'Maria', text: 'The UI/UX path was clear and practical. Highly recommended.' },
            ].map((t, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-center mb-3 text-yellow-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">“{t.text}”</p>
                <div className="text-sm font-semibold text-gray-900">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Get learning tips in your inbox</h2>
          <p className="text-gray-600 mb-6">Join our newsletter for weekly resources, guides, and new course updates.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed!');
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" className="px-6 py-3 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CourseHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals and subject matter experts who bring real-world experience to every lesson.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with interactive content, assignments, and peer discussions to enhance your learning experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificates</h3>
              <p className="text-gray-600">
                Earn certificates upon course completion to showcase your new skills and advance your career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers with our courses.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CourseHub</h3>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and expert instruction.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Browse Courses</Link></li>
                <li><Link to="/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Teach</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white">Become an Instructor</Link></li>
                <li><Link to="/courses" className="hover:text-white">Create Course</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CourseHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
