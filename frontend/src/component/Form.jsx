import React from "react";
import './Form.css';
//import AppForm from "../appform";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Form = (proops) => {

return (
<div className="formone">

 
    <input placeholder={proops.placeholder}/>


</div>

);

};
export default Form;