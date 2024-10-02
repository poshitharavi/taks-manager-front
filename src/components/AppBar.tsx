import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const MyAppBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant={isMobile ? "h6" : "h5"}>Task Manager</Typography>
        </Box>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
