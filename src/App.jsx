
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
import Myteam from "./Components/Deshboard/Myteam";
import ChangePassword from "./Components/Deshboard/ChangePassword";
import SidebarContext from "./Utils/SidebarContext";
import Profile from "./Components/Deshboard/Profile";




const App = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const refreshToken = async () => {
    const refresh = sessionStorage.getItem("refresh");

    if (!refresh) {
      console.warn("No refresh token found. Cannot refresh access token.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/auth/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });

      const data = await res.json();

      // ✅ Check if both access and refresh tokens are returned
      if (data.access && data.refresh) {
        sessionStorage.setItem("access", data.access);
        sessionStorage.setItem("refresh", data.refresh);
        console.log("✅ Access and refresh token updated");
      } else if (data.access) {
        sessionStorage.setItem("access", data.access);
        console.log("✅ Access token refreshed (no new refresh token)");
      } else {
        console.warn("⚠️ Failed to get new access token", data);
      }

    } catch (err) {
      console.error("❌ Token refresh failed:", err);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStorage.getItem("refresh")) {
        console.log("⏳ Refreshing token...");
        refreshToken();
      }
    }, 1 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);





  return (
    <BrowserRouter>


      <SidebarContext>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/dashboard/user" />} />
          <Route path="/dashboard" element={<Privetroute><DashboardLayout /></Privetroute>}>

            <Route path="main" element={<MainDeshboard />} />
            <Route path="user" element={<AllUsers />} />
            <Route path="upload" element={<Fileupload />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="myteam" element={<Myteam />} />
            <Route path="files" element={<AllFiels />} />
            <Route path="report" element={<Report />} />
            <Route path="change" element={<ChangePassword />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Routes>
      </SidebarContext>
    </BrowserRouter>
  );
};

export default App;