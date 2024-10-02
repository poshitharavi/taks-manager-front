import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      setUser(userData.body);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 8,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Link href="/register" variant="body2" textAlign="center">
          Don't have an account? Register here.
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
