import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes({isLogged}) {
 
  return isLogged === "true" ? <Outlet /> : <Navigate to="/login" />;
}
