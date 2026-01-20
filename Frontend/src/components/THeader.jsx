import React from "react";
import img from "../images/gym.jpg";

const THeader = () => {
  return (
    <header className="relative h-40">
      {" "}
      {/* Adjust the height here */}
      <img
        src={img}
        className="absolute inset-0 w-full h-full object-cover"
        alt="gymPic"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl font-bold">Welcome to Our Gym</h1>{" "}
        {/* Adjust the font size here */}
        <p className="mt-2 text-sm">
          "Booking your appointment is the first step towards achieving your
          goals"
        </p>
      </div>
    </header>
  );
};

export default THeader;
