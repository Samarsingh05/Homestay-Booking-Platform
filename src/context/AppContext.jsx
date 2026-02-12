import { createContext, useState, useEffect } from 'react';
import simpleAuth from '../services/simpleAuth';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [hostId, setHostId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const currentUser = simpleAuth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setRole(currentUser.role);
      setIsAuthenticated(true);
      
      if (currentUser.role === 'customer') {
        setCustomerId(currentUser.id);
      } else if (currentUser.role === 'host') {
        setHostId(currentUser.id);
      }
    }
  }, []);

  const login = async (credentials, userRole) => {
    try {
      const result = simpleAuth.login(credentials, userRole);
      
      if (result.success) {
        setUser(result.user);
        setRole(userRole);
        setIsAuthenticated(true);
        
        if (userRole === 'customer') {
          setCustomerId(result.user.id);
        } else if (userRole === 'host') {
          setHostId(result.user.id);
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData, userRole) => {
    try {
      const result = simpleAuth.register({ ...userData, role: userRole });
      
      if (result.success) {
        setUser(result.user);
        setRole(userRole);
        setIsAuthenticated(true);
        
        if (userRole === 'customer') {
          setCustomerId(result.user.id);
        } else if (userRole === 'host') {
          setHostId(result.user.id);
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    simpleAuth.logout();
    setUser(null);
    setRole(null);
    setHostId(null);
    setCustomerId(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{
      user,
      role,
      setRole,
      hostId,
      setHostId,
      customerId,
      setCustomerId,
      isAuthenticated,
      setIsAuthenticated,
      login,
      register,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};