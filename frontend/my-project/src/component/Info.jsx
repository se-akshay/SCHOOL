import React from "react";

const Info = () => {
  return (
    <div className="bg-[#f8f9fb]  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Streamline School Management
        </h2>
        <p className="text-xl text-center text-gray-500 mb-12 max-w-3xl mx-auto">
          Experience seamless school administration with our powerful and
          intuitive platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
            <div className="bg-gradient-to-br from-[#2980d9] to-[#4ba3f7] rounded-lg w-14 h-14 flex items-center justify-center mb-6">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Add Schools
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Easily register new schools with comprehensive information and
              validation
            </p>
            <button className="bg-[#f8f9fb] border border-gray-200 rounded-lg px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
            <div className="bg-[#2ecc71] rounded-lg w-14 h-14 flex items-center justify-center mb-6">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 4v16c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4M5 4h14M5 4l7 6 7-6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Browse Directory
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Explore our comprehensive database of schools with advanced search
              features
            </p>
            <button className="bg-[#f8f9fb] border border-gray-200 rounded-lg px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 transition">
              View Schools
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
            <div className="bg-gradient-to-br from-[#2980d9] to-[#4ba3f7] via-[#2ecc71] rounded-lg w-14 h-14 flex items-center justify-center mb-6">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l2 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Quality Assured
            </h3>
            <p className="text-gray-500 text-center mb-6">
              All schools are verified and maintained with up-to-date
              information
            </p>
            <button className="bg-[#f8f9fb] border border-gray-200 rounded-lg px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
