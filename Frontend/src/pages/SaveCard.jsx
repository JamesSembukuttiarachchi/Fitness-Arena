import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

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

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    cardName: Yup.string().required("Card name is required"),
    cardType: Yup.string().required("Card type is required"),
    cardNumber: Yup.string().required("Card number is required"),
    nameOnCard: Yup.string().required("Name on card is required"),
    expiryMonth: Yup.number()
      .required("Expiry month is required")
      .min(1, "Expiry month must be between 1 and 12")
      .max(12, "Expiry month must be between 1 and 12"),
    expiryYear: Yup.number()
      .required("Expiry year is required")
      .min(new Date().getFullYear(), "Expiry year must be in the future"),
    cvv: Yup.string().required("CVV is required"),
  });

  const handleForms = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      await axios.post("http://localhost:6005/savecard/", values);
      resetForm(); // Reset form fields if submission is successful
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChangeForm2 = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const handleCardType = (type) => {
    setForm2({ ...form2, cardType: type });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="flex flex-col gap-1 items-center">
          <h3 className="title">Payment:</h3>
          <Formik
            initialValues={form2}
            validationSchema={validationSchema}
            onSubmit={handleForms}
          >
            {({ isSubmitting }) => (
              <FormikForm>
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

                  <ErrorMessage
                    name="cardName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label>Cards Accepted: </label>
                  <div className="flex gap-1">
                    <div
                      onClick={() => handleCardType("Master")}
                      className={`${
                        form2.cardType === "Master" ? "bg-gray-200" : ""
                      } cursor-pointer`}
                    >
                      <FaCcMastercard className="text-4xl" />
                    </div>
                    <div
                      onClick={() => handleCardType("Visa")}
                      className={`${
                        form2.cardType === "Visa" ? "bg-gray-200" : ""
                      } cursor-pointer`}
                    >
                      <FaCcVisa className="text-4xl" />
                    </div>
                    <div
                      onClick={() => handleCardType("AmericanExpress")}
                      className={`${
                        form2.cardType === "AmericanExpress"
                          ? "bg-gray-200"
                          : ""
                      } cursor-pointer`}
                    >
                      <FaCcAmex className="text-4xl" />
                    </div>
                  </div>
                  <ErrorMessage
                    name="cardType"
                    component="div"
                    className="text-red-500"
                  />
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
                  <ErrorMessage
                    name="nameOnCard"
                    component="div"
                    className="text-red-500"
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
                  <ErrorMessage
                    name="cardNumber"
                    component="div"
                    className="text-red-500"
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
                  <ErrorMessage
                    name="expiryMonth"
                    component="div"
                    className="text-red-500"
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
                    <ErrorMessage
                      name="expiryYear"
                      component="div"
                      className="text-red-500"
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
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-sky-300 m-8 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : "Submit"}
                </button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SaveCard;