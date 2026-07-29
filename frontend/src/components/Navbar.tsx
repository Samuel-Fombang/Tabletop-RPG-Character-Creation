import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold">
        Tabletop RPG Character Creator
      </h1>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="hover:text-blue-300"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-300"
        >
          Profile
        </Link>

        <Link
          to="/about"
          className="hover:text-blue-300"
        >
          About
        </Link>

        <button
          onClick={logout}
          className="rounded bg-red-600 px-3 py-2 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;