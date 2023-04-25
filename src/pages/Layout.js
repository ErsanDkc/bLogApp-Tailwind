import React, { useCallback, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
function Layout() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const checkLogin = useCallback(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate,token]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const logout = () => {
    localStorage.clear();
  };
  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-500 ... h-[72px] flex items-center px-4">
        <ul className="w-full flex justify-around items-center">
          <li>
            <NavLink to="/" className="text-white font-bold tracking-[2px]">
              Blog App
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink to="/login">
                <button
                  onClick={logout}
                  className="bg-red-600 py-2 px-4 text-white rounded border-solid border-white tracking-[1.5px]"
                >
                  Logout
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
