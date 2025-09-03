import React, { useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:5000"; 

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(`${BACKEND_URL}/schools`)
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch(() => setSchools([]));
  }, []);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.city.toLowerCase().includes(search.toLowerCase()) ||
      school.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fb] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#2ecc71] rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3L2 8l10 5 10-5-10-5zm0 13c-4.418 0-8-1.79-8-4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0 2.21-3.582 4-8 4z"
            />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
          School Directory
        </h2>
        <p className="text-gray-500 text-center text-lg">
          Discover and explore schools in our network
        </p>
      </div>
      <div className="max-w-xl w-full mb-6">
        <input
          type="text"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
          placeholder="Search schools by name, city, or state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4 text-gray-500 text-center">
        Showing {filteredSchools.length} of {schools.length} schools
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {filteredSchools.map((school, idx) => (
          <div
            key={school.id || idx}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={
                  school.image ||
                  school.image_url ||
                  "https://placehold.co/300x200?text=No+Image"
                }
                alt={school.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x200?text=No+Image";
                }}
              />
              <span className="absolute top-2 right-2 bg-white text-gray-600 text-xs font-semibold px-2 py-1 rounded shadow">
                ID: {school.id}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {school.name}
                </h3>
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z"
                    />
                  </svg>
                  {school.city}, {school.state}
                </div>
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 8v1m0 8v1m-6-6h1m8 0h1"
                    />
                  </svg>
                  {school.address}
                </div>
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8z"
                    />
                  </svg>
                  {school.contact}
                </div>
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 01-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"
                    />
                  </svg>
                  {school.email_id}
                </div>
              </div>
              <button className="mt-4 w-full bg-[#f8f9fb] border border-gray-200 rounded-lg px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 13v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m16-6V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16-6l-8 8-8-8"
                  />
                </svg>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
