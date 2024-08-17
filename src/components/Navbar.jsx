import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowCircleRight } from "iconsax-react";
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
    // console.log(menu);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };
  return (
    <div className="absolute  top-0 left-0 right-0  w-full">
      <header className="flex-row  text-[#6fdee7] font-serif font-extrabold text-[40px] w-full flex justify-center text-center mt-4
       ">
        Tourbook
        <Lottie
          className="h-20 pb-3 w-20"
          animationData={header}
          loop={false}
        ></Lottie>
      </header>
      <p className="text-white font-serif italic  flex justify-center">
        We love to hear your stories, {user} !
      </p>
      <nav className="hidden sm:flex sm:flex-row justify-around p-5 font-mono text-white  cursor-pointer w-full h-full pt-10 text-[20px] ">
        <Link to={"/"}>
          <h3 className="hover:bg-sky-600 rounded-xl p-3">Home </h3>
        </Link>
        <Link to={"/write"}>
          <h3 className="hover:bg-sky-600 rounded-xl p-3">Write a blog</h3>
        </Link>
        <Link to={"/"}>
          {" "}
          <h3 className="hover:bg-sky-600 rounded-xl p-3">About </h3>
        </Link>
        {user ? (
          <h3
            className="hover:bg-sky-600 rounded-xl p-3"
            onClick={handleLogout}
          >
            Logout{" "}
          </h3>
        ) : (
          <Link to={"/login"}>
            {" "}
            <h3 className="hover:bg-sky-600 rounded-xl p-3">Login </h3>
          </Link>
        )}
      </nav>
      <button
        className="sm:hidden flex text-white items-start my-1"
        onClick={handleMenu}
      >
        <ArrowCircleRight
          size="25"
          color="white"
          variant="Bold"
          className="absolute top-2"
        />
      </button>
      
      

      <div
        className={`${
          menu ? "absolute w-2/3 h-[200px] top-4" : "hidden"
        } flex-col ml-3 mt-4 border-2 border-solid border-gray rounded w-1/4 mt-4  bg-white items-center justify-center `}
        onBlur={()=>setMenu(false)}
      >
          
        <Link to={"/"}>
          <h3 className="hover:border-2 hover:border-solid hover:border-gray hover:bg-gray-300 w-full text-center h-1/4 text-xl bold font  focus:bg-emerald-400">
            Home
          </h3>
        </Link>
        <Link to={"/write"}>
          <h5 className="hover:border-2 hover:border-solid hover:border-gray hover:bg-gray-300 w-full text-center h-1/4 text-xl  focus:bg-emerald-400">
            Write a blog
          </h5>
        </Link>
        <h5 className="hover:border-2 hover:border-solid hover:border-gray hover:bg-gray-300 w-full text-center h-1/4 text-xl focus:bg-emerald-400">
          About
        </h5>
        {user ? (
          <h3
            className="hover:border-2 hover:border-solid hover:border-gray hover:bg-gray-300 w-full text-center  h-1/4 text-xl focus:bg-emerald-400"
            onClick={handleLogout}
            >
            Logout
          </h3>
        ) : (
          <Link to={"/login"}>
            <h3 className="hover:border-2 hover:border-solid hover:border-gray hover:bg-gray-300 w-full text-center">Login </h3>
          </Link>
        )}
     
        </div>
    </div>
  );
}

export default Navbar;
