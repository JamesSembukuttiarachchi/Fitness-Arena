import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import heroImage from "../assets/hero2.png";
import axios from "axios";
import { FaQuoteRight } from "react-icons/fa6";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6005/feedback")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate the number of rows needed based on the number of feedbacks
  const numRows = Math.ceil(feedbacks.length / 3); // Assuming 3 columns

  // Generate an array of indices for the grid cells
  const cellIndices = Array.from({ length: numRows * 3 }, (_, index) => index);

  return (
    <div>
      <Header />

      <div
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`, // Use the imported image
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-white text-5xl font-normal font-['Sans Serif Collection']">
              Feedbacks and Testimonials
            </h1>

            <button className="btn bg-orange">View Feedbacks</button>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto grid grid-cols-3 gap-16 mt-10">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className={`bg-gray flex flex-col justify-center items-center rounded-lg p-6 ${
                index % 3 === 1 ? "bg-orange" : "" // Apply orange background color to middle cells
              }`}
              style={{ minWidth: "200px" }} // Set a fixed width for each grid cell
            >
              <>
                <FaQuoteRight className="inline-block w-6 h-6" />{" "}
                {/* Set width and height for the quote icon */}
                <p className="text-white">{feedback.feedback}</p>
                <p className="text-gray-300">
                  {feedback.firstName} {feedback.lastName}
                </p>
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFeedbacks;
