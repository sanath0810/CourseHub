import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar (disabled for horizontal navbar) */}
      <div className="hidden">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-center px-4">
            <h1 className="text-xl font-bold text-primary-600">CourseHub</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {allNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            {user ? (
              <>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.firstName} />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center justify-center px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <Link to="/login" className="text-sm text-primary-600 hover:underline">Login</Link>
                <Link to="/register" className="text-sm text-gray-600 hover:underline">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop sidebar (disabled for horizontal navbar) */}
      <div className="hidden">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-primary-600">CourseHub</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {allNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            {user ? (
              <>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.firstName} />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center justify-center px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <Link to="/login" className="text-sm text-primary-600 hover:underline">Login</Link>
                <Link to="/register" className="text-sm text-gray-600 hover:underline">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div>
        {/* Top bar (horizontal navbar, always visible) */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-3 h-16 items-center px-6 md:px-8 lg:px-10">
            {/* Brand (left) */}
            <div className="flex items-center justify-start">
              <Link to="/" className="text-lg font-bold text-primary-600">CourseHub</Link>
            </div>

            {/* Centered navigation */}
            <nav className="hidden md:flex items-center justify-center gap-6">
              {allNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? 'text-primary-700 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth actions (right) */}
            <div className="flex items-center justify-end space-x-4">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-sm text-primary-600 hover:underline">Login</Link>
                  <Link to="/register" className="text-sm text-gray-600 hover:underline">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
