import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ui/api1.0/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      console.log("Login successful:", result);
      localStorage.setItem("token", result.token); // ✅ Save token
      navigate("/main-page");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Logo */}
      <div className="absolute top-10 left-20 z-50">
        <img
          src="https://www.autointelli.com/assets/img/hero-logo.webp"
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Page */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="mt-4 text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
            Autointelli Pam
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-10 px-6 shadow-2xl rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-white"
                >
                  Username
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-800"
                    placeholder="your_username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white"
                >
                  Password
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-800"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-white">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-300 hover:underline hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-2 px-4 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-violet-500 hover:from-pink-700 hover:to-violet-600 rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
