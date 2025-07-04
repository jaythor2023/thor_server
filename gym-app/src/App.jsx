import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Gallery from "./components/Gallery";
import AdminLogin from "./components/AdminLogin";
import AdminAppointments from "./components/AdminAppointments";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On mount, check if admin is already logged in
  useEffect(() => {
    const storedLogin = localStorage.getItem("adminLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // When login state changes, update localStorage
  useEffect(() => {
    localStorage.setItem("adminLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin login route */}
        <Route
          path="/admin/login"
          element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected route for admin dashboard */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminAppointments /> : <Navigate to="/admin/login" />
          }
        />
      </Routes>
    </Router>
  );
}
