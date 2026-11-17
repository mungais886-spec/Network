import { Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout";
import Outh from "./Components/Outh";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Profile from "./Components/Profile";
import VerifyEmail from "./Pages/VerifyEmail";
import Leardership from "./Pages/Leardership";
import Events from "./Pages/Events";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import Events1 from "./Components/Events1";
<<<<<<< Updated upstream
=======
import { Devotional } from "./Components/Devotional";
import ProtectedRoute from "./Components/ProtectedRoute";
import Welcome from "./Pages/Identity";

>>>>>>> Stashed changes

function App() {
  return (
    <Routes>
      {/* Public pages with the main navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/learders" element={<Leardership />} />
        <Route path="/events" element={<Events1 />} />
<<<<<<< Updated upstream
=======
        <Route path="/devotion" element={<Devotional />} />
        <Route path="/identiy" element={<Welcome />}/>
>>>>>>> Stashed changes
      </Route>

      {/* Authentication pages */}
      <Route element={<Outh />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verifyemail" element={<VerifyEmail />}/>

        {/* Only authenticated members can access this page */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;