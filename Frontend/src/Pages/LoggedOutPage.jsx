import { Link } from "react-router-dom";

const LoggedOutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          You are logged out
        </h2>
        <p className="text-gray-600 mb-6">
          To re-login, click the button below.
        </p>
        <Link
          to="/login"
          className="inline-block w-full text-white bg-gradient-to-r from-pink-600 to-violet-500 hover:from-pink-700 hover:to-violet-600 rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default LoggedOutPage;
