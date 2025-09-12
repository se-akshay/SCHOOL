import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
// const BACKEND_URL = "http://localhost:5000";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) return setMessage("Enter email first.");
    setLoadingOtp(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
        setIsError(false);
      } else {
        setMessage(data.error || "Failed to send OTP.");
        setIsError(true);
      }
    } catch {
      setMessage("Network error.");
    }
    setLoadingOtp(false);
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingSignup(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Redirecting to Sign In...");
        setIsError(false);
        setTimeout(() => {
          window.location.href = "/signin?welcome=1";
        }, 1500);
      } else {
        setMessage(data.error || "Signup failed.");
        setIsError(true);
        setOtp("");
        setPassword("");
      }
    } catch {
      setMessage("Network error.");
      setIsError(true);
      setOtp("");
      setPassword("");
    }
    setLoadingSignup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-full w-14 h-14 flex items-center justify-center mb-2">
            <span className="text-white text-3xl font-bold">+</span>
          </div>
          <h2 className="text-2xl font-bold mb-1 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 text-center mb-2">
            Sign up to get started with{" "}
            <span className="text-teal-500 font-semibold">EduManage</span>
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                className="border px-3 py-2 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer"
                onClick={handleSendOtp}
                disabled={loadingOtp || otpSent}
              >
                {loadingOtp ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
          {otpSent && (
            <div>
              <label className="block mb-1 font-medium">OTP</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border px-3 py-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!otpSent || !otp}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded font-semibold cursor-pointer"
            disabled={loadingSignup || !otpSent || !otp}
          >
            {loadingSignup ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
