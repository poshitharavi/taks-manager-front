import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MyAppBar from "./AppBar";
import { Box, Container } from "@mui/material";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(UserContext)!;

  return user ? (
    <>
      <MyAppBar />
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: { xs: 2, sm: 4 },
            padding: { xs: 1, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
