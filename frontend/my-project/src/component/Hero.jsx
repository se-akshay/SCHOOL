import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="h-40vh flex flex-col items-center justify-center bg-gradient-to-br from-[#0984e3] to-[#00b894] px-4 py-8">
      <div className="bg-white/10 rounded-full w-[80px] h-[80px] md:w-[110px] md:h-[110px] flex items-center justify-center mb-6 md:mb-8">
        <svg
          className="w-10 h-10 md:w-14 md:h-14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3L2 8l10 5 10-5-10-5zm0 13c-4.418 0-8-1.79-8-4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0 2.21-3.582 4-8 4z"
            fill="#fff"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
        Welcome to <span className="text-[#ffeaa7]">EduManage</span>
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 md:mb-10 text-center max-w-3xl px-4">
        Your comprehensive school management system. Easily add new schools and
        browse through our extensive directory of educational institutions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
        <button
          className="bg-white text-[#0984e3] font-medium text-base md:text-lg lg:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 shadow-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
          onClick={() => navigate("/add-school")}
        >
          <span className="text-xl md:text-2xl font-bold">+</span> Add New
          School
        </button>
        <button
          className="bg-white text-[#0984e3] font-medium text-base md:text-lg lg:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 shadow-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
          onClick={() => navigate("/show-schools")}
        >
          <span className="text-xl md:text-2xl font-bold">≡</span> Browse
          Schools
        </button>
      </div>
    </div>
  );
};

export default Hero;
