import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const AddSchool = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await fetch(`${BACKEND_URL}/schools`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("School added successfully!");
        setForm({
          name: "",
          address: "",
          city: "",
          state: "",
          contact: "",
          email_id: "",
        });
        setImageFile(null);
      } else {
        setMessage(data.message || "Error adding school");
      }
    } catch (err) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#2980d9] rounded-full w-16 h-16 flex items-center justify-center mb-4">
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
              d="M12 3L2 8l10 5 10-5-10-5zm0 13c-4.418 0-8-1.79-8-4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0 2.21 3.582 4-8 4z"
            />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
          Add New School
        </h2>
        <p className="text-gray-500 text-center text-lg">
          Fill in the details to register a new school in the system
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md max-w-xl w-full mx-auto p-8">
        <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
          School Information
        </h3>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Please provide accurate information for the school registration
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="flex items-center font-medium text-gray-700 mb-1">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3L2 8l10 5 10-5-10-5z"
                />
              </svg>
              School Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
              placeholder="Enter school name"
            />
          </div>
          <div>
            <label className="flex items-center font-medium text-gray-700 mb-1">
              <svg
                className="w-5 h-5 mr-2"
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
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
              placeholder="Enter complete address"
              rows={2}
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
                placeholder="Enter city"
              />
            </div>
            <div className="flex-1">
              <label className="font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
                placeholder="Enter state"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="flex items-center font-medium text-gray-700 mb-1">
                <svg
                  className="w-5 h-5 mr-2"
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
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
                placeholder="Enter 10-digit number"
              />
            </div>
            <div className="flex-1">
              <label className="flex items-center font-medium text-gray-700 mb-1">
                <svg
                  className="w-5 h-5 mr-2"
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
                Email Address
              </label>
              <input
                type="email"
                name="email_id"
                value={form.email_id}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2980d9]"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center font-medium text-gray-700 mb-1">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                />
                <circle cx="12" cy="7" r="4" />
              </svg>
              School Image (Optional)
            </label>
            <ImageUpload onImageUpload={handleImage} />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2980d9] text-white font-semibold rounded-lg py-3 mt-4 hover:bg-[#2176c7] transition"
          >
            Add School
          </button>
          {message && (
            <div className="mt-4 text-center text-green-600">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
