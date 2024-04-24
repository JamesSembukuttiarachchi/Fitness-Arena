import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";


const MinindiTest = () => {
  const [form1, setForm1] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
    city: "",
    zip: "",
  });

  const [form2, setForm2] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const handleForms = () => {
    setLoading(true);
    axios
      .all([
        axios.post("http://localhost:6005/delivery/", form1),
        axios.post("http://localhost:6005/card/", form2),
      ])
      .then(() => {
        setLoading(false);
      })

      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleChangeForm1 = (e) => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };

  const handleChangeForm2 = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header/>
      <div className="flex flex-row justify-center gap-2">
        {/* form1 */}
        <div>
          <h3 className="title">Billing address:</h3>
          <div className="flex flex-col">
            <label>Full Name: </label>
            {/* md */}
            <input
              name="fullName"
              value={form1.fullName}
              onChange={handleChangeForm1}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col">
              <label>Email: </label>
              {/* md */}
              <input
                name="email"
                value={form1.email}
                onChange={handleChangeForm1}
                type="email"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col">
              <label>Phone: </label>
              {/* md */}
              <input
                name="phone"
                value={form1.phone}
                onChange={handleChangeForm1}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label>Address: </label>
            {/* md */}
            <input
              name="address"
              value={form1.address}
              onChange={handleChangeForm1}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <label>City: </label>
            {/* md */}
            <input
              name="city"
              value={form1.city}
              onChange={handleChangeForm1}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col">
              <label>State: </label>
              {/* md */}
              <input
                name="state"
                value={form1.state}
                onChange={handleChangeForm1}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col">
              <label>zip: </label>
              {/* md */}
              <input
                name="zip"
                value={form1.zip}
                onChange={handleChangeForm1}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* form2 */}
        <div className="flex flex-col gap-1">
          <h3 className="title">Payment:</h3>
          <div className="flex flex-col">
            <label>Cards Accepted: </label>
            {/* md */}
            <div className="flex gap-1">
              <div><FaCcMastercard className="text-4xl"/></div>
              <div><FaCcVisa className="text-4xl"/></div>
              <div><FaCcAmex className="text-4xl"/></div>

            </div>
          </div>

          <div className="flex flex-col">
            <label>Name on Card: </label>
            {/* md */}
            <input
              name="nameOnCard"
              value={form2.nameOnCard}
              onChange={handleChangeForm2}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <label>Credit Card Number: </label>
            {/* md */}
            <input
              name="cardNumber"
              value={form2.cardNumber}
              onChange={handleChangeForm2}
              type="number"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <label>Expiry Month: </label>
            {/* md */}
            <input
              name="expiryMonth"
              value={form2.expiryMonth}
              onChange={handleChangeForm2}
              type="number"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col">
              <label>Expiry Year: </label>
              {/* md */}
              <input
                name="expiryYear"
                value={form2.expiryYear}
                onChange={handleChangeForm2}
                type="number"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col">
              <label>CVV: </label>
              {/* md */}
              <input
                name="cvv"
                value={form2.cvv}
                onChange={handleChangeForm2}
                type="number"
                placeholder="Type here"
                className="input input-bordered input-md w-full max-w-xs"
              />
            </div>
          </div>
          <button className="p-2 bg-sky-300 m-8 rounded-md" onClick={handleForms}>
          Submit
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default MinindiTest;
