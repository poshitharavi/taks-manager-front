import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
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
          Register
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </Button>
        <Link href="/login" variant="body2" textAlign="center">
          Already have an account? Login here.
        </Link>
      </Box>
    </Container>
  );
};

export default Register;
