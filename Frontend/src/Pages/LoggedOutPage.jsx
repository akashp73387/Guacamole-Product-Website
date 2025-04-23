import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Optional for animations

const LoggedOutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Top Left Logo (Same as LoginPage) */}
      <div className="absolute top-10 left-20 z-50">
        <img
          src="https://www.autointelli.com/assets/img/hero-logo.webp"
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
          Autointelli Pam
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-gray-800 shadow-2xl rounded-2xl py-10 px-6 sm:px-10 text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">
            You’ve been logged out
          </h1>
          <p className="text-gray-300 mb-8">
            Sign in again to continue your session.
          </p>

          <Link
            to="/*"
            className="w-full flex justify-center py-2 px-4 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-violet-500 hover:from-pink-700 hover:to-violet-600 rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Sign In Again
          </Link>

          {/* Optional: Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              to="/home-page"
              className="text-sm text-blue-300 hover:underline hover:text-blue-400"
            >
              ← Return to homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoggedOutPage;
