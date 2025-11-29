import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, BookOpen, User, LogOut, X, GraduationCap, Menu
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isEducator, isStudent } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const educatorNavigation = [
    { name: 'My Courses', href: '/instructor/courses', icon: BookOpen },
    { name: 'Create Course', href: '/instructor/courses/create', icon: GraduationCap },
  ];

  const studentNavigation = [
    { name: 'Browse Courses', href: '/courses', icon: BookOpen },
  ];

  const allNavigation = [
    ...navigation,
    ...(isEducator ? educatorNavigation : []),
    ...(isStudent ? studentNavigation : [])
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all">
                  C
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">CourseHub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {allNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${isActive(item.href) ? 'text-primary-600' : 'text-gray-400'}`} />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden lg:block">
                      <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white shadow-sm flex items-center justify-center text-primary-700 font-bold text-sm">
                      {user.avatar ? (
                        <img className="h-full w-full rounded-full object-cover" src={user.avatar} alt="" />
                      ) : (
                        `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {allNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            {user && (
              <div className="pt-4 pb-4 border-t border-gray-200 px-4">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
};
