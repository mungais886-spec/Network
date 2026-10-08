
import { Route,Routes,Link } from 'react-router-dom'
import Home from './Pages/Home'
import Events from './Pages/Events'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'

export default function App() {
  return (
    <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
     </Routes>
    </>
  
  )
}