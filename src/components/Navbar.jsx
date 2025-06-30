import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowCircleLeft } from "iconsax-react";
import Lottie from "lottie-react";
import header from "../assets/header.json";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, dispatch } = useContext(Context);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <div className="absolute top-0 left-0 right-0 w-screen z-50 bg-transparent bg-transparent">
      <header className="flex justify-between items-center px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-pacifico font-bold text-gray-800 text-white ">Tourbook :)</h1>
          {/* <Lottie className="h-10 w-10" animationData={header} loop={false} /> */}
        </div>

        {/* Desktop Navbar Links */}
        <nav className="hidden sm:flex space-x-8 text-lg text-white items-center">
          <Link to="/" className="hover:bg-black py-2 px-4 rounded">Home</Link>
          <Link to="/write" className="hover:bg-black py-2 px-4 rounded">Write a blog</Link>
          <Link to="/about" className="hover:bg-black py-2 px-4 rounded">About</Link>
          {user ? (
            <h3
              className="hover:bg-black py-2 px-4 rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h3>
          ) : (
            <Link to="/login" className="hover:bg-black py-2 px-4 rounded">Login</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex text-gray-800"
          onClick={handleMenu}
        >
          <ArrowCircleLeft size="25" className="text-white" />
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${
          menu ? "flex" : "hidden"
        } flex-col bg-white absolute top-full left-0 right-0 w-full shadow-lg sm:hidden`}
      >
        <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Home</Link>
        <Link to="/write" className="block py-2 px-4 hover:bg-gray-200">Write a blog</Link>
        <Link to="/about" className="block py-2 px-4 hover:bg-gray-200">About</Link>
        {user ? (
          <h3
            className="block py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h3>
        ) : (
          <Link to="/login" className="block py-2 px-4 hover:bg-gray-200">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
