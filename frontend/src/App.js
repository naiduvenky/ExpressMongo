import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import ProductivityPage from "./components/ProductivityPage";
import UserProfilePage from "./components/UserProfilePage";
import { useSelector } from "react-redux";



function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.token
  );
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/productivity"
            element={isAuthenticated ? <ProductivityPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/userProfile"
            element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Container>
    </Router>
  );
}


export default App;

