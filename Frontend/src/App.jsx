import { Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout";
import Outh from "./Components/Outh";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Profile from "./Components/Profile";

function App() {
  return (
    <Routes>
      {/* Public pages with the main navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
      </Route>

      {/* Authentication pages */}
      <Route element={<Outh />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Only authenticated members can access this page */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;