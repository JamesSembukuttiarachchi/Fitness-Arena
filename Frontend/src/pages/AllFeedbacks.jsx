import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import heroImage from "../assets/hero2.png";
import axios from "axios";
import { FaQuoteRight } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

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

  // Function to navigate to another page
  const handleViewFeedbacks = () => {
    navigate("/viewfeedback"); // Navigate to the specified route
  };

  return (
    <Layout>
      <div>
        <div
          className="hero"
          style={{
            backgroundImage: `url(${heroImage})`, // Use the imported image
            backgroundSize: "cover", // Cover the entire area of the container
            backgroundPosition: "center", // Center the background image horizontally and vertically
            height: "500px", // Set the height of the hero section
            width: "100%", // Set the width of the hero section to 100% of the container
          }}
        >
          <div className="hero-content flex justify-center items-center h-full text-center">
            <div>
              <h1 className="text-white text-5xl font-normal font-['Sans Serif Collection']">
                Feedbacks and Testimonials
              </h1>
              <button
                className="btn bg-orange-500 mt-4"
                onClick={handleViewFeedbacks}
              >
                View My Feedbacks
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="container mx-auto grid grid-cols-3 gap-16 mt-10">
            {feedbacks.map((feedback, index) => (
              <div
                key={index}
                className={`bg-gray-400 flex flex-col justify-center items-center rounded-lg p-6 ${
                  index % 3 === 1 ? "bg-orange-500" : "" // Apply orange background color to middle cells
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
    </Layout>
  );
};

export default AllFeedbacks;
