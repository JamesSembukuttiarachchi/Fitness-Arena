import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">Contact us to stay fit</h1>
            <p className="mb-5">
              View feedback from our belowed Customers
            </p>
            <Link to="/feedbacks">
            <button className="btn bg-orange-500 hover:bg-orange-700 text-black ">View Feedbacks</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
