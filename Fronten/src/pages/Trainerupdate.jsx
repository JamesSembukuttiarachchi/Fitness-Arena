import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [monday,  setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [friday, setFriday] = useState("");
  const [sunday, setSunday] = useState("");
  const { id } = useParams(); // Extract MongoDB Object ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointment details based on the appointment ID
    axios
      .get(`http://localhost:6005/trainer`)
      .then((res) => {
        const trainerData = res.data;
        // Set state values for each input field based on fetched appointment details
        setName(trainerData.name);
        setMonday(trainerData.monday);
        setTuesday(trainerData.tuesday);
        setFriday(trainerData.friday);
        setSunday(trainerData.sunday);
       
      })
      .catch((error) => {
        console.error("Error fetching trainer details:", error);
        alert("Error fetching trainer details. Please try again later.");
      });
  }, [id]);

  const sendData = (e) => {
    //e.preventDefault();
   //const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
     // .toString()
     // .//padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const trainer = {
        name,
        monday,
        tuesday,
        friday,
        sunday,
      
    };

    axios
      .put(`http://localhost:6005/trainer`, trainer)
      .catch((error) => {
        console.error("Failed to edit trainer details:", error);
        alert("Failed to edit trainer details. Error: " + error.message);
      });
    }
}