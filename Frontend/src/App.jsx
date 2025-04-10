import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import Navbar from "./Components/Navbar";
import LoggedoutPage from "./Pages/LoggedoutPage";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to login by default */}
        <Route path="*" element={<LoginPage />} />
        <Route path="/home-page" element={<Navbar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logged-out" element={<LoggedoutPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPasswordPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
