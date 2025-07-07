import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "../../index.css";
import NavMenu from "./NavMenu";
import Logo from "../../ui/Logo";
import axios from "../../utils/axios.js";
import { toast } from "react-toastify";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Explore", href: "/explore" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Help", href: "/help" },
  ];

  /* checking if user logged in or not */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect( () => {
    const checkAuth = async() => {
        try{
        const res = await axios.get('/users/user-dashboard', {
            withCredentials: true
        })

        setIsAuthenticated(true)

        // toast.success("User Authenticated")
    }
    catch(error){
        const message = error.response?.data?.message || "Something went wrong"
        setIsAuthenticated(false)
        // toast.error(message)
    }
        
    }

    checkAuth();
  },[])

  return (
    <section className="w-full px-2 py-2 ">
      <div className="md:w-[80%] w-[90%] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white text-[16px] hover:text-purple-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {!isAuthenticated ? (
            <>
              <button className="px-5 font-semibold py-1 navButton">
                Log in
              </button>
              <button className="navButton px-4 font-semibold py-1">
                Sign up
              </button>
            </>
          ) : (
            <button className="navButton px-4 font-semibold py-1">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X color="#1ed760" size={28} />
            ) : (
              <Menu color="#1ed760" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <NavMenu />
          {/* Optionally add buttons below NavMenu */}
          <div className="flex flex-col gap-3 mt-2 mb-2 items-center justify-center">

            {!isAuthenticated ? 
            <>
            <a href="/login" className="px-5 font-semibold py-1 navButton">
              Log in
            </a>
            <a href="/signup" className="navButton px-4 font-semibold py-1">
              Sign up
            </a>
            </>
            :
            <a href="/logout" className="navButton px-4 font-semibold py-1">
            Logout
          </a>
          }
            
          </div>
        </div>
      )}
    </section>
  );
}

export default Header;
