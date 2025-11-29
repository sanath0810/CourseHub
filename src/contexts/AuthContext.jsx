/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const MOCK_USERS = [
  {
    id: 1,
    email: 'student@a2.com',
    password: 'student123',
    firstName: 'John',
    lastName: 'Student',
    role: 'student',
    avatar: null,
    bio: 'I love learning new things!'
  },
  {
    id: 2,
    email: 'educator@a2.com',
    password: 'educator123',
    firstName: 'Jane',
    lastName: 'Educator',
    role: 'educator',
    avatar: null,
    bio: 'Passionate about teaching and sharing knowledge.'
  },
  {
    id: 3,
    email: 'admin@a2.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: null,
    bio: 'System administrator'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse saved user', err);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Invalid credentials. Please use the provided demo accounts.' 
      };
    }
  };

  const register = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, we'll just show an error message
    return { 
      success: false, 
      error: 'Registration is disabled in demo mode. Please use the provided demo accounts.' 
    };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isEducator: user?.role === 'educator' || user?.role === 'admin',
    isStudent: user?.role === 'student',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
