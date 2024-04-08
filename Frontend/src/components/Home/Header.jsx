import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import bars from '../../assets/bars.png';
import { Link } from 'react-scroll';

const Header = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between">
      <img src={Logo} alt="Logo" className="w-40 h-12" />
      {menuOpened === false && mobile === true ? (
        <div
          className="menu-icon bg-appColor p-2 rounded cursor-pointer"
          onClick={() => setMenuOpened(true)}
        >
          <img src={bars} alt="Menu" className="w-6 h-6" />
        </div>
      ) : (
        <ul className="flex gap-8 items-center">
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              activeClass="active"
              to="hero"
              spy={true}
              smooth={true}
              className="text-white hover:text-orange cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              spy={true}
              smooth={true}
              className="text-white hover:text-orange cursor-pointer"
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              spy={true}
              smooth={true}
              className="text-white hover:text-orange cursor-pointer"
            >
              Why us
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="plans"
              spy={true}
              smooth={true}
              className="text-white hover:text-orange cursor-pointer"
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="testimonials"
              spy={true}
              smooth={true}
              className="text-white hover:text-orange cursor-pointer"
            >
              Testimonials
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
