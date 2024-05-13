import React, { useContext, useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout/Layout";
import { AuthContext } from "../context/AuthContext";

const SaveCard = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null)

  const validationSchema = Yup.object().shape({
    cardName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Card name should not contain numbers")
      .required("Card name is required"),
    cardType: Yup.string().required("Card type is required"),
    cardNumber: Yup.string().required("Card number is required"),
    nameOnCard: Yup.string().required("Name on card is required"),
    expiryMonth: Yup.string()
      .required("Expiry month is required")
      .min(1, "Expiry month must be between 1 and 12")
      .max(12, "Expiry month must be between 1 and 12"),
    expiryYear: Yup.string().required("Expiry year is required"),
    //.min(new Date().getFullYear().toString(), "Expiry year must be in the future"),
    cvv: Yup.string().required("CVV is required"),
  });

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:6005/api/users/${user.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        setUserId(data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    if (user) {
      fetchUserId();
    }
  }, []); // Empty dependency array ensures the effect runs only once

  const handleForms = async (values, { resetForm, setFieldValue }) => {
    setLoading(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const response = await axios.post("http://localhost:6005/savecard/", values);
      const cardId = response.data._id; // Extracting ID from the response

      resetForm(); // Reset form fields if submission is successful
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <div className="container">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="title">Payment:</h3>
            <Formik
              initialValues={{
                cardName: "",
                cardType: "",
                cardNumber: "",
                nameOnCard: "",
                expiryMonth: "",
                expiryYear: "",
                cvv: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleForms}
            >
              {({ isSubmitting, setFieldValue }) => (
                <FormikForm>
                  <div className="flex flex-col">
                    <label>Card Name</label>
                    <Field
                      name="cardName"
                      type="text"
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]*$/;
                        const key = String.fromCharCode(
                          !event.charCode ? event.which : event.charCode
                        );
                        if (!regex.test(key)) {
                          event.preventDefault();
                        }
                      }}
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
                        onClick={() => setFieldValue("cardType", "Master")}
                        className={`cursor-pointer`}
                      >
                        <FaCcMastercard className="text-4xl" />
                      </div>
                      <div
                        onClick={() => setFieldValue("cardType", "Visa")}
                        className={`cursor-pointer`}
                      >
                        <FaCcVisa className="text-4xl" />
                      </div>
                      <div
                        onClick={() =>
                          setFieldValue("cardType", "AmericanExpress")
                        }
                        className={`cursor-pointer`}
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
                    <Field
                      name="nameOnCard"
                      type="text"
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]*$/;
                        const key = String.fromCharCode(
                          !event.charCode ? event.which : event.charCode
                        );
                        if (!regex.test(key)) {
                          event.preventDefault();
                        }
                      }}
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
                    <Field
                      name="cardNumber"
                      type="number"
                      onKeyPress={(event) => {
                        const regex = /^[0-9]*$/;
                        const key = String.fromCharCode(
                          !event.charCode ? event.which : event.charCode
                        );
                        if (!regex.test(key)) {
                          event.preventDefault();
                        }
                      }}
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
                    <Field
                      as="select"
                      name="expiryMonth"
                      className="input input-bordered input-md w-full max-w-xs"
                    >
                      <option value="">Please Select</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        )
                      )}
                    </Field>
                    <ErrorMessage
                      name="expiryMonth"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Expiry Year: </label>
                    <Field
                      as="select"
                      name="expiryYear"
                      className="input input-bordered input-md w-full max-w-xs"
                    >
                      <option value="">Please Select</option>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="expiryYear"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>CVV: </label>
                    <Field
                      name="cvv"
                      type="number"
                      onKeyPress={(event) => {
                        const regex = /^[0-9]*$/;
                        const key = String.fromCharCode(
                          !event.charCode ? event.which : event.charCode
                        );
                        if (!regex.test(key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="Type here"
                      className="input input-bordered input-md w-full max-w-xs"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-red-500"
                    />
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
    </Layout>
  );
};

export default SaveCard;
