import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const SaveCard = () => {
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

  return (
    <div>
      <Header />
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
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                  <ErrorMessage name="cardName" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label>Cards Accepted: </label>
                  <div className="flex gap-1">
                    <div onClick={() => setFieldValue("cardType", "Master")} className={`cursor-pointer`}>
                      <FaCcMastercard className="text-4xl" />
                    </div>
                    <div onClick={() => setFieldValue("cardType", "Visa")} className={`cursor-pointer`}>
                      <FaCcVisa className="text-4xl" />
                    </div>
                    <div onClick={() => setFieldValue("cardType", "AmericanExpress")} className={`cursor-pointer`}>
                      <FaCcAmex className="text-4xl" />
                    </div>
                  </div>
                  <ErrorMessage name="cardType" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label>Name on Card: </label>
                  <Field
                    name="nameOnCard"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                  <ErrorMessage name="nameOnCard" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label>Credit Card Number: </label>
                  <Field
                    name="cardNumber"
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                  <ErrorMessage name="cardNumber" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label>Expiry Month: </label>
                  <Field
                    name="expiryMonth"
                    as="select"
                    className="input input-bordered input-md w-full max-w-xs"
                  >
                    <option value="">Select</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="expiryMonth" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label>Expiry Year: </label>
                  <Field
                    name="expiryYear"
                    as="select"
                    className="input input-bordered input-md w-full max-w-xs"
                  >
                    <option value="">Select</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="expiryYear" component="div" className="text-red-500" />
                </div>

                <div className="flex gap-1">
                  <div className="flex flex-col">
                    <label>CVV: </label>
                    <Field
                      name="cvv"
                      type="number"
                      placeholder="Type here"
                      className="input input-bordered input-md w-full max-w-xs"
                    />
                    <ErrorMessage name="cvv" component="div" className="text-red-500" />
                  </div>
                </div>

                <button type="submit" className="p-2 bg-sky-300 m-8 rounded-md" disabled={isSubmitting}>
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
