import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const Cancel = () => {
  const [userid, setID] = useState("");
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [trainername, setTrainer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  

  const sendData = (e) => {
    e.preventDefault();

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    const appointment = {
      userid,
      firstname,
      lastname,
      trainername,
      date,
      time: time.toString(), // Convert time to string
      email,
      phone,
    };

    axios
      .delete("http://localhost:6005/appointmentsbook/", appointment)
      //.then(() => {
       // alert("Appointment booked successfully");
      //})
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        alert("Failed to Edit appointment. Error: " + error.message);
      });
  };
}
  export default Cancel;
