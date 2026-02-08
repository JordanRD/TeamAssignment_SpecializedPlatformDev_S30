import {
  NavLink,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition
     ${isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"}`;

  return (
    <>
      <nav className="h-[72px] bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <NavLink to="/" end className={navItemClass}>
              Home
              {/* ACTIVE INDICATOR */}
              {({ isActive }) =>
                isActive && (
                  <span className="absolute left-0 right-0 -bottom-[18px] h-[3px] bg-primary rounded-full" />
                )
              }
            </NavLink>

            <NavLink to="/products" className={navItemClass}>
              Products
              {({ isActive }) =>
                isActive && (
                  <span className="absolute left-0 right-0 -bottom-[18px] h-[3px] bg-primary rounded-full" />
                )
              }
            </NavLink>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* CART ICON */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative p-2 rounded-md transition
                 ${isActive
                   ? "text-primary"
                   : "text-gray-600 hover:text-gray-900"}`
              }
            >
              <ShoppingCartIcon className="h-6 w-6" />

              {/* ACTIVE INDICATOR */}
              {({ isActive }) =>
                isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-[18px] w-6 h-[3px] bg-primary rounded-full" />
                )
              }
            </NavLink>

            {token ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi, <span className="font-medium">{user?.name}</span>
                </span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* ROUTE CONTENT */}
      <Outlet />
    </>
  );
}

export default Navbar;
