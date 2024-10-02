import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/TaskList";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute component for protected routes

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/task-list"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
