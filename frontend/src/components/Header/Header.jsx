import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../utils/axios.js'
import { toast } from "react-toastify";
import Logo from "../../ui/Logo.jsx";
import NavMenu from "./NavMenu.jsx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Explore", href: "/explore" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Help", href: "/help" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/users/user-dashboard", { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [])

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged out successfully!!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full px-2 py-2">
      <div className="md:w-[80%] w-[90%] mx-auto flex justify-between items-center">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, idx) => {
            const to =
              item.name === "Dashboard" && !isAuthenticated
                ? "/error"
                : item.href;
            return (
              <Link
                key={idx}
                to={to}
                className="text-white text-[16px] hover:text-purple-300"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-5 font-semibold py-1 navButton">
                Log in
              </Link>
              <Link
                to="/signup"
                className="navButton px-4 font-semibold py-1"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogOut}
              className="navButton px-4 font-semibold py-1"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((o) => !o)}>
            {isMenuOpen ? (
              <X color="#1ed760" size={28} />
            ) : (
              <Menu color="#1ed760" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden">
          <NavMenu />
          <div className="flex flex-col gap-3 mt-2 mb-2 items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-5 font-semibold py-1 navButton">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="navButton px-4 font-semibold py-1"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogOut}
                className="navButton px-4 font-semibold py-1"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Header;
