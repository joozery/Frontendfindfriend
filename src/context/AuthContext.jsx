import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // ใช้ Heroku backend URL
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://backendfriends-appname-3ba809a4eedc.herokuapp.com';

  console.log('AuthContext initialized with BACKEND_URL:', BACKEND_URL);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...');
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Auth response status:', response.status);
      console.log('Auth response headers:', response.headers);
      
      const data = await response.json();
      console.log('Auth response data:', data);
      
      if (data.user) {
        console.log('User found:', data.user);
        setUser(data.user);
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithLine = () => {
    // Redirect to backend LINE login endpoint
    window.location.href = `${BACKEND_URL}/auth/line/login`;
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      toast({
        title: "ออกจากระบบแล้ว",
        description: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถออกจากระบบได้",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithLine,
    logout,
    isLoggedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 