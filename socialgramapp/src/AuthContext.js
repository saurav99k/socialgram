// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt-token');
    //////////////////////////////// Validate token with the server and set isAuthenticated accordingly //////////////////////
    setIsAuthenticated(true); /// TO CHANGE LATER AFTER VALIDATING THE JWT WITH SERVER !
  }, []);

  return <AuthContext.Provider value={isAuthenticated}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };