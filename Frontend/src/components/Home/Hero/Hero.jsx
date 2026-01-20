import React from "react";
import "./Hero.css";
import Header from "../Header/Header";
import hero_image from "../../../assets/hero_image.png";
import hero_image_back from "../../../assets/hero_image_back.png";
import heart from "../../../assets/heart.png";
import calories from "../../../assets/calories.png";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";
import { Link } from "react-router-dom"; // Import Link for navigation

const Hero = () => {
  const transition = { type: "tween", duration: 3 };
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const mobile = window.innerWidth <= 768 ? true : false;
  const handleClick = () => {
    logout();
  };
  return (
    <div className="heroo flex justify-between" id="hero">
      <div className="blurr blur-h w-[22rem] h-[30rem] left-0"></div>
      <div className="left-h p-8 pt-6 flex flex-[3] gap-6  flex-col">
        <Header />
        {/*the best ad */}
        <div className="the-best-ad mt-16 bg-[#363d42] rounded-[4rem] w-fit py-5 px-[13px] text-white relative flex items-center justify-start">
          <motion.div
            className="absolute bg-norange w-20 h-4/5 left-2 rounded-[3rem] z-[1]"
            initial={{ left: mobile ? "170px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={transition}
          ></motion.div>
          <span className="z-[2]">THE BEST FITNESS CLUB IN THE TOWN</span>
        </div>

        {/*hero text*/}
        <div className="hero-text flex flex-col gap-6 uppercase text-[4.5rem] font-bold text-white">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal Body</span>
          </div>
          <div className="text-[1rem] font-[200] normal-case tracking-[1px] w-4/5">
            <span>
              In here we will help you to shape and build your ideal body and
              live up your life to fullest
            </span>
          </div>
        </div>

        {/*figures*/}
        {/*<div className="figures flex gap-8">
          <div>
            <span>
              <NumberCounter end={140} start={100} delay="1" preFix="+" />
            </span>
            <span>Expert Coaches</span>
          </div>
          <div>
            <span>
              <NumberCounter end={978} start={800} delay="1" preFix="+" />
            </span>
            <span>Memebers Joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={40} start={1} delay="1" preFix="+" />
            </span>
            <span>Fitness Programs</span>
          </div>
        </div>*/}

        {/*hero buttons*/}
        <div className="hero-buttons flex gap-4 font-normal">
            {user ? (<Link to="/tracker">
            <button className="bttn text-white bg-norange w-auto rounded-md hover:bg-orange-600">
              Track My Progress
            </button>
          </Link>): (<div></div>)}
          
        </div>
      </div>
      <div className="right-h flex-1 relative bg-norange">
        {user ? (
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse absolute right-12 top-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-full rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/userprofile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleClick}>
                    <a>Logout</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="bttn bg-white rounded-md hover:bg-gray-300 absolute right-12 top-8 text-black">
              Get Started
            </button>
          </Link>
        )}

        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={{ ...transition, type: "spring" }}
          className="heart-rate flex flex-col gap-4 bg-dGray w-fit p-4 items-start rounded-[5px] absolute right-16 top-28"
        >
          <img src={heart} alt="" className="w-8" />
          <span className="text-ngray">Heart Rate</span>
          <span className="text-white text-[1.5rem]">116 bpm</span>
        </motion.div>

        {/*hero images*/}
        <img
          src={hero_image}
          alt=""
          className="hero-image absolute top-40 right-32 w-[23rem]"
        />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "20rem" }}
          transition={{ ...transition, type: "spring" }}
          src={hero_image_back}
          alt=""
          className="hero-image-back absolute top-16 right-80 w-60 z-[-1]"
        />
        {/*calories image*/}
        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={{ ...transition, type: "spring" }}
          className="calories flex gap-8 bg-caloryCard rounded-[5px] p-4 w-fit absolute top-[32rem] right-[28rem]"
        >
          <img src={calories} alt="" className="w-12" />
          <div className="flex flex-col justify-between">
            <span className="text-ngray">Calories Burned</span>
            <span className="text-white text-[1.5rem]">220 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
