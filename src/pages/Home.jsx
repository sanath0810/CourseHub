import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Users, Award, CheckCircle, Star, Play, Search, Zap, Globe, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getCourses } from '../utils/mockData';
import { Card, CardContent } from '../components/Card';
import TodoList from '../components/TodoList';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const { courses } = getCourses({ page: 1, limit: 3 });
    setFeatured(courses);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
                C
              </div>
              <h1 className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                Course<span className="text-primary-600">Hub</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/courses" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Explore</Link>
              <Link to="/mentors" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Mentors</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="hidden sm:block text-gray-700 font-medium">Hi, {user.firstName}</span>
                  <Link
                    to="/dashboard"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/40 transform hover:-translate-y-0.5"
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
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary-100/50 to-transparent rounded-tr-[100px]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">New courses added weekly</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 animate-fade-in-up delay-100">
                Master New Skills <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-500">
                  Without Limits
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
                Unlock your potential with expert-led courses in coding, design, business, and more. Join a global community of learners today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
                <Link
                  to="/courses"
                  className="group bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30 hover:shadow-primary-600/40 flex items-center justify-center gap-2"
                >
                  Browse Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 justify-center sm:justify-start px-6 py-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">500+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative animate-float delay-500">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                  alt="Students learning"
                  className="rounded-xl w-full object-cover h-[400px] lg:h-[500px]"
                />

                {/* Floating Cards */}
                <div className="absolute -left-8 top-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce delay-700">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Course Completed</p>
                    <p className="text-sm font-bold text-gray-900">React Advanced</p>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce delay-1000">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Daily Streak</p>
                    <p className="text-sm font-bold text-gray-900">12 Days 🔥</p>
                  </div>
                </div>
              </div>

              {/* Decorative blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-200 to-secondary-200 rounded-full blur-3xl -z-10 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: '10k+', icon: Users },
              { label: 'Total Courses', value: '500+', icon: BookOpen },
              { label: 'Expert Mentors', value: '100+', icon: Award },
              { label: 'Countries', value: '50+', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-4 group">
                <div className="p-3 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <p className="text-gray-600 max-w-xl">Find the perfect course to upgrade your skills and advance your career path.</p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View All Categories <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Development', icon: '💻', color: 'bg-blue-100 text-blue-600' },
              { name: 'Design', icon: '🎨', color: 'bg-pink-100 text-pink-600' },
              { name: 'Business', icon: '💼', color: 'bg-purple-100 text-purple-600' },
              { name: 'Marketing', icon: '📢', color: 'bg-orange-100 text-orange-600' },
              { name: 'Photography', icon: '📷', color: 'bg-green-100 text-green-600' },
              { name: 'Music', icon: '🎵', color: 'bg-red-100 text-red-600' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary-200 transition-all text-center"
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Handpicked by our experts, these courses are trending among learners worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((course) => (
              <Card key={course.id} className="group border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden rounded-2xl bg-white h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/courses/${course.id}`} className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-primary-600 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      View Course
                    </Link>
                  </div>
                  <img
                    src={course.thumbnail || `https://source.unsplash.com/random/800x600?${course.category}`}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-primary-700 shadow-sm uppercase tracking-wide">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="px-3 py-1 text-sm font-bold rounded-lg bg-primary-600 text-white shadow-lg">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium text-primary-600 uppercase tracking-wide">
                    <BookOpen className="w-4 h-4" />
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
                    {course.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.firstName}+${course.lastName}&background=random`}
                        alt={course.firstName}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <span className="text-sm font-medium text-gray-700">{course.firstName} {course.lastName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      4.8
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              View All Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Todo List Widget Section (Kept as requested but styled) */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary-500 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Organized & Focused</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Track your learning progress with our built-in tools. Set goals, manage assignments, and never miss a deadline.
              </p>
              <ul className="space-y-4">
                {[
                  'Create custom learning paths',
                  'Set daily study reminders',
                  'Track completion certificates',
                  'Sync across all devices'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/10 shadow-2xl">
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary-600/30">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your journey?</h2>
              <p className="text-primary-100 text-lg mb-10">
                Join over 10,000 students learning on CourseHub today. Get unlimited access to all courses with our premium plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/pricing"
                  className="bg-primary-700 text-white border border-primary-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-800 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
                <span className="text-xl font-bold text-white">CourseHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering learners worldwide with quality education and expert instruction. Start your journey today.
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors cursor-pointer">
                    <Globe className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/courses" className="hover:text-primary-400 transition-colors">Browse Courses</Link></li>
                <li><Link to="/mentors" className="hover:text-primary-400 transition-colors">Mentors</Link></li>
                <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
                <li><Link to="/business" className="hover:text-primary-400 transition-colors">For Business</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Subscribe</h4>
              <p className="text-gray-400 mb-4">Get the latest updates and resources.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-gray-800 border-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2025 CourseHub. Created By Savvana Rahul⚡,Pavan Kumar 🔥And Sanath Kumar 🤖. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
