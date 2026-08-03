import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(
      "registeredUser",
    );

    navigate("/login", {
      replace: true,
    });
  };

  const getLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-purple-700 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-xl shadow">
            ⚔️
          </span>

          <div>
            <p className="text-lg font-bold leading-tight">
              Tabletop RPG
            </p>

            <p className="text-xs text-slate-400">
              Character Creator
            </p>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink
            to="/dashboard"
            className={getLinkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/character/create"
            className={getLinkClass}
          >
            Create Character
          </NavLink>

          <NavLink
            to="/profile"
            className={getLinkClass}
          >
            Profile
          </NavLink>

          <NavLink
            to="/about"
            className={getLinkClass}
          >
            About
          </NavLink>

          <button
            type="button"
            onClick={logout}
            className="ml-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 lg:ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;