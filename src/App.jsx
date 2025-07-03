
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllUsers from './Components/Deshboard/AllUsers';
import Fileupload from './Components/Deshboard/Fileupload';
import DashboardLayout from "./Components/DashboardLayout";
import Privetroute from "./Utils/Privetroute";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainDeshboard from "./Components/Deshboard/MainDeshboard";
import AllFiels from "./Components/Deshboard/AllFiels";
import TeamManagement from "./Components/Deshboard/TeamManagement";
import Report from "./Components/Deshboard/Report";
import React, { useEffect, useState } from "react";
const App = () => {
  const refreshToken = async () => {
    const refresh = sessionStorage.getItem("refresh");
    try {
      const res = await fetch("https://team-focu-z-backend.vercel.app/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });
      const data = await res.json();
      if (data.access) {
        sessionStorage.setItem("access", data.access);
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sessionStorage.getItem("refresh")) {
        refreshToken();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard/user" />} />
        <Route path="/dashboard" element={<Privetroute><DashboardLayout /></Privetroute>}>
          <Route path="main" element={<MainDeshboard />} />
          <Route path="user" element={<AllUsers />} />
          <Route path="upload" element={<Fileupload />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="files" element={<AllFiels />} />
          <Route path="report" element={<Report />} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;