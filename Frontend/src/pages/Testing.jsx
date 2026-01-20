import React, { useEffect, useState } from "react";
import axios from "axios";
const Testing = () => {
  const [plansData, setPlansData] = useState([]); // State to store plans data

  useEffect(() => {
    // Fetch plans data from the server
    const fetchPlansData = async () => {
      try {
        const response = await axios.get("http://localhost:6005/packages");
        setPlansData(response.data);
      } catch (error) {
        console.error("Error fetching plans data:", error);
      }
    };

    fetchPlansData();
  }, []);

  // Function to extract file name from photoURL
  const extractFileName = (photoURL) => {
    return photoURL.split("\\").pop(); // Split the string by backslash and get the last element
  };

  return (
    <div>
      {plansData.map((plan, i) => (
        <div key={i}>
          <h1>{plan.photoURL}</h1>
          <img
            src={`http://localhost:6005/images/${extractFileName(plan.photoURL)}`}
            alt="asd"
          />
        </div>
      ))}
    </div>
  );
};

export default Testing;
