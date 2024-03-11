import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('token') ? true : false
  );
  const [userId, setUserId] = useState(
    sessionStorage.getItem('userId') || null
  );
  const [userName, setUserName] = useState(
    sessionStorage.getItem('userName') || null
  );

  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = (count) => {

    setCartItemCount(count);
    sessionStorage.setItem('cartItemCount', count);
  };


  const login = (token,id,name) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('userName', name);
    setIsAuthenticated(true);
    setUserId(id);
    setUserName(name)
  };

  

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserId(null);
    setUserName(null)
    setCartItemCount(0)
    sessionStorage.removeItem( 'cartItemCount' )
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,cartItemCount,updateCartItemCount, login, logout,userId,userName,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
