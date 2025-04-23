import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import LoggedOutPage from "./Pages/LoggedOutPage";
import Mainpage from "./Pages/Mainpage";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to login by default */}
        <Route path="*" element={<LoginPage />} />
        <Route path="/main-page" element={<Mainpage />} />
        <Route path="/logged-out" element={<LoggedOutPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />}  />
      </Routes>
    </Router>
  );
};

export default App;
