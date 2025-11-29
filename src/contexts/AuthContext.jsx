import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          firstName: userData.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
          lastName: userData.lastName || firebaseUser.displayName?.split(' ')[1] || '',
          avatar: firebaseUser.photoURL,
          role: userData.role || 'student',
          bio: userData.bio || ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '')
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        // First time Google sign-in, create user profile with default role
        const [firstName = 'User', lastName = ''] = (result.user.displayName || 'User').split(' ');
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          firstName,
          lastName,
          role: 'student', // Default role for Google sign-in
          avatar: result.user.photoURL,
          bio: '',
          createdAt: new Date().toISOString()
        });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '')
      };
    }
  };

  const register = async ({ email, password, firstName, lastName, role }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name
      await updateFirebaseProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      // Save user profile to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        firstName,
        lastName,
        role,
        avatar: null,
        bio: '',
        createdAt: new Date().toISOString()
      });

      // Update local state
      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firstName,
        lastName,
        role,
        avatar: null,
        bio: ''
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '')
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const updateProfile = async (profileData) => {
    if (!auth.currentUser) return { success: false, error: 'No user logged in' };

    try {
      // Update Firebase Auth profile if name or avatar changed
      if (profileData.firstName || profileData.lastName || profileData.avatar) {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: `${profileData.firstName || user.firstName} ${profileData.lastName || user.lastName}`,
          photoURL: profileData.avatar || user.avatar
        });
      }

      // Update Firestore document
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...profileData,
        email: user.email // Keep email unchanged
      }, { merge: true });

      setUser(prev => ({ ...prev, ...profileData }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    signInWithGoogle,
    isAuthenticated: !!user,
    isEducator: user?.role === 'educator' || user?.role === 'admin',
    isStudent: user?.role === 'student' || !user?.role,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
