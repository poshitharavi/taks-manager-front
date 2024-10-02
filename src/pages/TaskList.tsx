import React, { useContext } from "react";
import { Container, Typography, Box } from "@mui/material";
import { UserContext } from "../context/UserContext";

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)!;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to your Dashboard, {user?.name}!
        </Typography>
        <Typography variant="body1">
          Here you can manage your tasks and keep track of your progress.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
