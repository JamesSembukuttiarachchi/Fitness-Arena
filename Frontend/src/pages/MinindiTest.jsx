import React, { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";
import swal from "sweetalert";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout/Layout";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  state: Yup.string().required("State is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().required("Zip is required"),
  cardNumber: Yup.string().required("Card Number is required"),
  nameOnCard: Yup.string().required("Name on Card is required"),
  expiryMonth: Yup.string().required("Expiry Month is required"),
  expiryYear: Yup.string().required("Expiry Year is required"),
  cvv: Yup.string().required("CVV is required"),
});

const MinindiTest = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6005/carts?email=${user.email}`
        );
        setCartItems(response.data);
        console.log(response.data); // Check the response data
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      nameOnCard: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleForms(values);
    },
  });

  const handleForms = (formData) => {
    setLoading(true);
    console.log(formData);
    axios
      .all([
        axios.post("http://localhost:6005/delivery/", formData),
        axios.post("http://localhost:6005/card/", formData),
      ])
      .then(() => {
        setLoading(false);
        swal({
          title: "Payment Success!",
          text: "Your order has been placed successfully!",
          icon: "success",
          button: "Get the invoice",
        }).then((value) => {
          if (value) {
            const cartItemIds = cartItems.map((item) => item._id);
            console.log(cartItemIds);
            axios
              .post("http://localhost:6005/payment/", { carts: cartItemIds })
              .then((response) => {
                console.log(
                  "Cart items posted to payment database:",
                  response.data
                );
                window.location.href = "/invoice";
              })
              .catch((error) => {
                console.error(
                  "Error posting cart items to payment database:",
                  error
                );
              });
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Layout>
    <div>
      <h1 className="text-3xl font-semibold p-8 text-center">
        Welcome to the Payment Gateway
      </h1>
      <div className="flex flex-row justify-center gap-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row justify-between gap-4">
              {/* Billing Address */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Billing address:</h3>
              <div className="flex flex-col">
                <label>Full Name: </label>
                <input
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-500">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col">
                  <label>Email: </label>
                  <input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    placeholder="Type here"
                    className={`input input-bordered input-md w-full max-w-xs border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label>Phone: </label>
                  <input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Type here"
                    className={`input input-bordered input-md w-full max-w-xs border ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.phone && formik.errors.phone
                        ? "focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <label>Address: </label>
                <input
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.address && formik.errors.address
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.address && formik.errors.address
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label>City: </label>
                <input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.city && formik.errors.city
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.city && formik.errors.city
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500">{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col">
                  <label>State: </label>
                  <input
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Type here"
                    className={`input input-bordered input-md w-full max-w-xs border ${
                      formik.touched.state && formik.errors.state
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.state && formik.errors.state
                        ? "focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  />
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-red-500">{formik.errors.state}</div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label>Zip: </label>
                  <input
                    name="zip"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Type here"
                    className={`input input-bordered input-md w-full max-w-xs border ${
                      formik.touched.zip && formik.errors.zip
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.zip && formik.errors.zip
                        ? "focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  />
                  {formik.touched.zip && formik.errors.zip ? (
                    <div className="text-red-500">{formik.errors.zip}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Payment:</h3>
              <div className="flex flex-col">
                <label>Name on Card: </label>
                <input
                  name="nameOnCard"
                  value={formik.values.nameOnCard}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.nameOnCard && formik.errors.nameOnCard
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.nameOnCard && formik.errors.nameOnCard
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
                  <div className="text-red-500">{formik.errors.nameOnCard}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label>Credit Card Number: </label>
                <input
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.cardNumber && formik.errors.cardNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.cardNumber && formik.errors.cardNumber
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <div className="text-red-500">{formik.errors.cardNumber}</div>
                ) : null}
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col">
                  <label>Expiry Month: </label>
                  <select
                    name="expiryMonth"
                    value={formik.values.expiryMonth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none w-full border input input-bordered input-md max-w-xs border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.expiryMonth && formik.errors.expiryMonth
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  >
                    <option value="">Please Select</option>
                    {[...Array(12).keys()].map((month) => (
                      <option
                        key={month + 1}
                        value={(month + 1).toString().padStart(2, "0")}
                      >
                        {(month + 1).toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  {formik.touched.expiryMonth && formik.errors.expiryMonth ? (
                    <div className="text-red-500">
                      {formik.errors.expiryMonth}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label>Expiry Year: </label>
                  <select
                    name="expiryYear"
                    value={formik.values.expiryYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none w-full border input input-bordered input-md max-w-xs border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                      formik.touched.expiryYear && formik.errors.expiryYear
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                  >
                    <option value="">Please Select</option>
                    {[...Array(10).keys()].map((year) => (
                      <option
                        key={year + 2023}
                        value={(year + 2023).toString()}
                      >
                        {year + 2023}
                      </option>
                    ))}
                  </select>
                  {formik.touched.expiryYear && formik.errors.expiryYear ? (
                    <div className="text-red-500">
                      {formik.errors.expiryYear}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <label>CVV: </label>
                <input
                  name="cvv"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Type here"
                  className={`input input-bordered input-md w-full max-w-xs border ${
                    formik.touched.cvv && formik.errors.cvv
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                    formik.touched.cvv && formik.errors.cvv
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {formik.touched.cvv && formik.errors.cvv ? (
                  <div className="text-red-500">{formik.errors.cvv}</div>
                ) : null}
              </div>
            </div>
          </div>
          </div>
          

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-700 m-8 rounded-md text-black flex justify-between"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default MinindiTest;
