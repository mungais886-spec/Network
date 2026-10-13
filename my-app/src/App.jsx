
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Outh from "./Components/Outh";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("loggedIn") === "true"
  );

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  return (
    <>
      {!hideNavbar && (
        <Navbar
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={<Outh />}>
          <Route
            path="signup"
            element={<SignUp onLogin={handleLogin} />}
          />
          <Route
            path="signin"
            element={<SignIn onLogin={handleLogin} />}
          />
        </Route>
      </Routes>
    </>
  );
}
