import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
// const BACKEND_URL = "http://localhost:5000";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("Server error");
    }
    setOtpLoading(false);
  };

  const handleVerifyOtp = async () => {
    setVerifyLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Server error");
    }
    setVerifyLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/"; // Redirect to home or dashboard
      } else {
        setError(data.error || "Signin failed");
      }
    } catch (err) {
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue to{" "}
          <span className="text-[#2ecc71] font-semibold">EduManage</span>
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="flex flex-row items-center gap-2">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={otpSent}
              />
            </div>
            <button
              type="button"
              className="mt-6 h-[42px] px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 flex items-center justify-center"
              onClick={handleSendOtp}
              disabled={!email || otpSent || otpLoading}
              style={{ minWidth: "110px" }}
            >
              {otpLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
          {otpSent && (
            <div className="flex flex-row items-center gap-2">
              <div className="flex-1">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  disabled={otpVerified}
                />
              </div>
              <button
                type="button"
                className="mt-6 h-[42px] px-4 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition duration-200 flex items-center justify-center"
                onClick={handleVerifyOtp}
                disabled={!otp || otpVerified || verifyLoading}
                style={{ minWidth: "110px" }}
              >
                {verifyLoading
                  ? "Verifying..."
                  : otpVerified
                  ? "Verified"
                  : "Verify"}
              </button>
            </div>
          )}
          {otpVerified && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-teal-500 transition duration-200"
            disabled={loading || !otpVerified}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
