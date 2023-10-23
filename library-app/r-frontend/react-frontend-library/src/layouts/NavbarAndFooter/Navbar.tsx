import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  if (!authState) {
    return <SpinnerLoading />;
  }
  console.log(authState);

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3 modern-navbar">
      <div className="container-fluid">
        <span className="navbar-brand modern-brand">
          E-Library
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-book ms-2"
            viewBox="0 0 16 16"
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
        </span>
        <button
          className="navbar-toggler modern-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse modern-nav"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link modern-link" to={"/home"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link modern-link" to={"/search"}>
                Search Books
              </NavLink>
            </li>
            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link modern-link" to={"/shelf"}>
                  Book shelf
                </NavLink>
              </li>
            )}

            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link modern-link" to={"/fees"}>
                  Pay fees
                </NavLink>
              </li>
            )}

            {authState.isAuthenticated &&
              authState.accessToken?.claims?.userType === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link modern-link" to={"/admin"}>
                    Manage library
                  </NavLink>
                </li>
              )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <Link
                  className="btn btn-outline-light modern-signin-btn"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light modern-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
