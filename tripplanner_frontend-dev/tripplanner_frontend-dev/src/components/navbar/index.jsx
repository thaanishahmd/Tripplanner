import React from "react";
import Login from "../modals/login";
import Register from "../modals/register";
import "./style.css";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="logo">Traveloo </div>
            <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
              <li>
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link" href="/hotel">
                  Hotels
                </a>
              </li>
              <li>
                <a className="nav-link" href="/package">
                  Packages
                </a>
              </li>
              <li>
                <a className="nav-link" href="/place">
                  Places
                </a>
              </li>
              <li>
                <a className="nav-link" href="/aboutUs">
                  About Us
                </a>
              </li>
              <li>
                <a className="nav-link" href="/contactUs">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            {localStorage.getItem("token") == null ? (
              <>
                <div>
                  <Login />
                </div>
                <div>
                  <Register />
                </div>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="?"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        localStorage.getItem("photo")
                          ? localStorage.getItem("photo")
                          : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      }
                      className="rounded-circle"
                      height={50}
                      alt="Avatar"
                      loading="lazy"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    <li>
                      <a className="dropdown-item" href="/profile">
                        User Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/allreviews">
                        Feedbacks
                      </a>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.clear();
                          window.location = "/home";
                        }}
                      >
                        Logout
                      </button>
                    </li>
                    {localStorage.getItem("role") !==
                      "user"?(
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              window.location = "/admin";
                            }}
                          >
                            Admin Page
                          </button>
                        </li>
                      ):null}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
