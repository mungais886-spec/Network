
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Outh from "./Components/Outh";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

function App() {
  return (
   
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<Outh />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Routes>
   
  );
}

export default App;
