import React, { useContext } from "react";
import { Route,Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const PrivateRoutes = ({ Component }) => {
  const { isAuthenticated } = useContext(AuthContext);
 
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoutes;


