import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
        Blog App
      </h1>

      <div className="space-x-4">
        {token && (
          <>
            <Link
              to="/dashboard"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Home
            </Link>

            <Link
              to="/create"
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Create Blog
            </Link>
          </>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
