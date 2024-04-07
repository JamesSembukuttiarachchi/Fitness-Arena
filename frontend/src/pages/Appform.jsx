import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from '../component/Form.jsx';
import axios from 'axios';
import '../component/Form.css';

const ReactDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <div>
        <lable htmlFor="date">Select a date & Time</lable>
        
        <p> </p>
        <DatePicker
        
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy; hh:mm"
          showTimeSelect
          timeIntervals={60}
          timeFormat='hh:mm'
        />
        
      </div>
    );
  };
  
  const AppForm = () => {
  
    const [userid, setID] = useState("");
    const [firstname, setFirst] = useState("");
    const [lastname, setlast] = useState("");
    const [trainername, settrainer] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
  function sendData(e){
  e.preventDefault();
  //alert("inserted");
  
  const newappointment ={
    userid,
    firstname,
    lastname,
    trainername,
    date: '',
    time: '',
    email,
    phone
  
  };
  
    axios.post('http://localhost:6005/appointmentsbook/', newappointment).then(()=>{
  
    alert("added")
    }).catch((err)=>{
    
      alert(err)
    })
    
    
    }


    return (
      
      <div className="AppForm">
        
        <center>
        <form >
          <h1>Booking an appointment</h1>
  
          <label htmlFor="userid">User Id : </label><p></p>
          <input type ="text" className="uid" placeholder="UserID" 
          onChange={(e)=>{
            setID(e.target.value);
  
          }}
          /><p></p>
  
          <label htmlFor="firstname">First Name : </label><p></p>
          <input placeholder="First Name" 
          onChange={(e)=>{
            setFirst(e.target.value);
  
          }}
          
          /><p></p>
  
          <label htmlFor="lastname">Last Name : </label><p></p>
          <input placeholder="Last Name" 
          onChange={(e)=>{
            setlast(e.target.value);
  
          }}
          /><p></p>
  
          <label htmlFor="email">Email : </label><p></p>
          <input placeholder="Email" 
          
          onChange={(e)=>{
            setEmail(e.target.value);
  
          }}
          /><p></p>
  
          <label htmlFor ="phone">Contact Number : </label><p></p>
          <input placeholder="Contact Number" 
          
          onChange={(e)=>{
            setPhone(e.target.value);
  
          }}
          /><p></p>
  
          <label htmlFor="trainername">Trainers Name : </label><p></p>
          <input placeholder="Trainers Name" 
          
          onChange={(e)=>{
            settrainer(e.target.value);
  
          }}
          /><p></p>
         
        </form>
        <ReactDatePicker />
        <button onClick={sendData}>Confirm</button></center>
      </div>
      
  
    );
  };

  export default AppForm;
