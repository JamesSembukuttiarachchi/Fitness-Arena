import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const StoreNavbar = () => {
  const [isSticky, setSticky] = useState(false);

  //handle scroll functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">
          Home
          <hr color="Aorangee" />
        </a>
      </li>
      <li>
        <details>
          <summary>
            <a href="/">Shop</a>
          </summary>
          <ul className="p-4">
            <li>
              <a href="/product">All</a>
            </li>
            <li>
              <a href="/product">Men</a>{" "}
            </li>
            <li>
              <a href="/product">Women</a>
            </li>
            <li>
              <a href="/product">Accessories</a>
            </li>
            <li>
              <a href="/product">Supplements</a>{" "}
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <header
      className="max-w-screen-2xl container mx-auto bg-gray-400 fixed top-0 left-0 right-0 transition-all duration-300
    ease-in-out font-bold"
    >
      <div
        className={
          'navbar xl:px-24 ${isSticky ? "shadow-md transition-all duration-300 ease-in-out":""}'
        }
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="logo" style={{ width: "15%" }} />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* nav items */}
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/*search icon */}
          {/* <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}

          {/*cart icon */}
          <Link to="cart-page">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 lg:flex hidden items-center justify-center"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">0</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StoreNavbar;
