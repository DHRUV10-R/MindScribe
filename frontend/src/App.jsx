import React from 'react'
import NavBar from "../src/components/NavBar"
import Home from "../src/components/Home"
import Footer from "../src/components/Footer"
import { Route , Routes, useLocation } from "react-router-dom"
import Blogs from "../src/Pages/Blogs"
import About from "../src/Pages/About"
import Contact from "../src/Pages/Contact"
import Login from "../src/Pages/Login"
import Register from "../src/Pages/Register"
import Dashboard from "../src/Pages/Dashboard"

function App() {
  const location=useLocation()
  const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname);
  return <div>
    {!hideNavbarFooter && <NavBar/>}
    
    <Routes>
      <Route exact path="/" element= {<Home />} />
      <Route exact path="/blogs" element= {<Blogs />} />
      <Route exact path="/about" element= {<About />} />
      <Route exact path="/contact" element= {<Contact />} />
      <Route exact path="/login" element= {<Login />} />
      <Route exact path="/register" element= {<Register />} />
      <Route exact path="/dashboard" element= {<Dashboard />} />
    </Routes>
    {!hideNavbarFooter && <Footer/>}
     </div>
  
}

export default App