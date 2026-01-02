import React, { useState, useEffect } from "react";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
