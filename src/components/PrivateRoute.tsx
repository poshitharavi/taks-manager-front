import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MyAppBar from "./AppBar";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(UserContext)!;

  return user ? (
    <>
      <MyAppBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
