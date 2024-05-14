import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../../public/logo.png";
import bars from "../../../assets/bars.png";
import { Link } from "react-router-dom";

const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="header flex justify-between">
      <img src={Logo} alt="" className="logo w-fit h-20" />
      {menuOpened === false && mobile === true ? (
        <div
          className="bg-appColor p-2 rounded-[5px]"
          onClick={() => setMenuOpened(true)}
        >
          <img src={bars} alt="" className="w-6 h-6" />
        </div>
      ) : (
        <ul className="header-menu list-none flex gap-8 text-white">
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              activeClass="active"
              to="hero"
              smooth={true}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              smooth={true}
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              smooth={true}
            >
              Why us
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="plans" smooth={true}>
              Plans
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="/mainapp"
              smooth={true}
            >
              Book Trainer
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="/recovery"
              smooth={true}
            >
              Post Workout Recovery
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
