import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MyAppBar: React.FC = () => {
  const { user, setUser } = useContext(UserContext)!;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {/* Show user name and logout button on medium or larger screens */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {user && (
              <>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ marginRight: 2 }}
                >
                  {user.name}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
          {/* Hamburger menu for smaller screens */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer for smaller screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem>
              <ListItemText primary={`Hello, ${user?.name}`} />
            </ListItem>
            <ListItem component="button" onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MyAppBar;
