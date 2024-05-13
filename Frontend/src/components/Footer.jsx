import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="p-10 bg-black footer px-36">
        <div className="flex flex-col md:flex-row  justify-normal md:gap-[24rem] overflow-hidden">
          <div className="">
            <div className="absolute flex flex-col-reverse">
              <div className="text-base font-normal leading-normal text-white">
                Get daily news on upcoming offers from many suppliers all over
                the world
              </div>
              <div className="text-xl font-semibold leading-7 text-white">
                Subscribe on our newsletter
              </div>
            </div>
            <div className="w-[426px]  mt-16 leading-normal">
              <span className="text-white text-[50px] font-bold font-['Saira Condensed'] uppercase">
                Ready for <br />
              </span>
              <span className="text-orange text-[50px] font-bold font-['Saira Condensed'] uppercase">
                awesome
              </span>
              <span className="text-white text-[50px] font-bold font-['Saira Condensed'] uppercase">
                {" "}
                Life?{" "}
              </span>
            </div>
            <div className="justify-start items-center gap-3.5 flex flex-row">
              <div className=" text-zinc-300 text-base font-normal font-['Saira Condensed']">
                <MdOutlineMail />
              </div>
              <div className="w-[131px] h-[25px] text-zinc-300 text-base font-normal font-['Saira Condensed'] capitalize">
                Info@bravestore.com
              </div>
            </div>
          </div>

          <div className="">
            <form>
              <fieldset className="form-control w-80">
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="bg-white input input-bordered join-item"
                  />
                  <button className="bttn bg-orange join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>

            <div className="text-zinc-300 text-3xl font-normal font-['Saira Condensed'] flex items-start justify-evenly p-4">
              <FaFacebook />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </footer>
      <footer className="p-4 text-white bg-black footer footer-center">
        <aside>
          <p>Copyright © 2024 - All right reserved by SafetyFirst Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};