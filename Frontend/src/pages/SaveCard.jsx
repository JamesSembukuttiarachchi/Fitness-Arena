import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";

const SaveCard = () => {
  const [form2, setForm2] = useState({
    cardName: "",
    cardType: "",
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const[loading, setLoading] =useState(false);
  const handleForms = () => {
    setLoading(true);
    axios
        .all([
            axios.post("/". form2)
        ])
        .then(() => {
            setLoading(false);
        })

        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
  };

  const handleChangeForm2 = (e) => {
    setForm2({...form2, [e.target.name]: e.target.value});
  }

  const handleCardType = (type) => {
    setForm2({ ...form2, cardType: type });
  };

  return (
    <div>
      <div className="container">
      <div className="flex flex-col gap-1">
          <h3 className="title">Payment:</h3>
          <div className="flex flex-col">
            <label>Card Name</label>
            {/* md */}
            <input
              name="cardName"
              value={form2.cardName}
              onChange={handleChangeForm2}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <label>Cards Accepted: </label>
            <div className="flex gap-1">
              {/* Added onClick handlers to each icon */}
              <div onClick={() => handleCardType("Master")}>
                <FaCcMastercard className="text-4xl" />
              </div>
              <div onClick={() => handleCardType("Visa")}>
                <FaCcVisa className="text-4xl" />
              </div>
              <div onClick={() => handleCardType("AmericanExpress")}>
                <FaCcAmex className="text-4xl" />
              </div>
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

export default SaveCard;
