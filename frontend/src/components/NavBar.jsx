import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="bg-black shadow-lg px-4 py-2">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl text-[#f2e782]">
            Mind<span className="text-white">Scrible</span>
          </div>
          {/* Desktop */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-6 text-[#f2e782]">
              <Link to="/" className="hover:text-white">HOME</Link>
              <Link to="/blogs" className="hover:text-white">BLOGS</Link>
              <Link to="/creators" className="hover:text-white">CREATORS</Link>
              <Link to="/about" className="hover:text-white">ABOUT</Link>
              <Link to="/contact" className="hover:text-white">CONTACT</Link>
            </ul>
            <div className="md:hidden text-[#f2e782]" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
          <div className="hidden md:flex space-x-2">
            {isAuthenticated && profile?.user?.role === "admin" ? (
              <Link to="/dashboard" className="bg-[#f2e782] text-black font-semibold hover:bg-white duration-300 px-4 py-2 rounded">
                DASHBOARD
              </Link>
            ) : (
              ""
            )}
            {!isAuthenticated ? (
              <Link to="/Login" className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded">
                LOGIN
              </Link>
            ) : (
              <button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded">
                LOGOUT
              </button>
            )}
          </div>
        </div>
        {/* Mobile navbar */}
        {show && (
          <div className="bg-black">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl text-[#f2e782]">
              <Link to="/" onClick={() => setShow(!show)} className="hover:text-white">HOME</Link>
              <Link to="/blogs" onClick={() => setShow(!show)} className="hover:text-white">BLOGS</Link>
              <Link to="/creators" onClick={() => setShow(!show)} className="hover:text-white">CREATORS</Link>
              <Link to="/about" onClick={() => setShow(!show)} className="hover:text-white">ABOUT</Link>
              <Link to="/contact" onClick={() => setShow(!show)} className="hover:text-white">CONTACT</Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
