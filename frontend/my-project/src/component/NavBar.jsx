import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-400 py-4 px-6 text-white">
      <div className="max-w-full mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center justify-center cursor-pointer sm:justify-start"
            onClick={() => navigate("/")}
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L2 8l10 5 10-5-10-5zm0 13c-4.418 0-8-1.79-8-4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0 2.21 3.582 4-8 4z"
                fill="#fff"
              />
            </svg>
            <span className="text-white font-bold text-xl sm:text-2xl flex items-center">
              EduManage
              <span className="ml-1 text-2xl sm:text-3xl font-bold">+</span>
            </span>
          </div>
          {/* Buttons */}
          <div className=" flex flex-col sm:flex-row sm:justify-end items-center gap-4 mt-2 sm:mt-0">
            <button
              onClick={() => navigate("/add-school")}
              className="flex items-center bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-150"
            >
              <span className="text-xl font-bold mr-2">+</span>
              <span>Add School</span>
            </button>
            <button
              onClick={() => navigate("/show-schools")}
              className="flex items-center bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-150"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>View Schools</span>
            </button>
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-150"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-150"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signout")}
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-150"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
