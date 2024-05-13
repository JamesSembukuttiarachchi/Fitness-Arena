import React, { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaCcAmex } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import Header from "../components/Header";
import swal from "sweetalert";
import { AuthContext } from "../context/AuthContext";

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
  const [cartItems, setCartItems] = useState([]);
  const {user} = useContext(AuthContext)

  // Fetch cart items when the component mounts

  useEffect(() => {
    // Fetch cart items when the component mounts
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

  const handleForms = () => {
    setLoading(true);
    console.log(form2);
    axios
      .all([
        axios.post("http://localhost:6005/delivery/", form1),
        axios.post("http://localhost:6005/card/", form2),
      ])
      .then(() => {
        setLoading(false);
        swal({
          title: "Payment Success!",
          text: "MR!",
          icon: "success",
          button: "Get the invoice",
        }).then((value) => {
          if (value) {
            const cartItemIds = cartItems.map((item) => item._id); // Use cartItems directly from the state
            console.log(cartItemIds);
            axios
              .post("http://localhost:6005/payment/", { carts: cartItemIds })
              .then((response) => {
                console.log(
                  "Cart items posted to payment database:",
                  response.data
                );
                // Navigate to another page
                // Replace "/invoice" with the URL of the invoice page
                window.location.href = "/invoice";
              })
              .catch((error) => {
                console.error(
                  "Error posting cart items to payment database:",
                  error
                );
              });
            // Navigate to another page
          }
        });
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
    const { name, value } = e.target;
    setForm2({ ...form2, [name]: value });
  };

  return (
    <div>
      <Header />
      <h1 class="text-3xl font-semibold p-8">
        {" "}
        Welcome to the Payment Gateway
      </h1>
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
              required
              className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
              required
              className="input input-bordered input-md w-full max-w-xsborder border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
              required
              className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
              <div>
                <FaCcMastercard className="text-4xl" />
              </div>
              <div>
                <FaCcVisa className="text-4xl" />
              </div>
              <div>
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
              required
              className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
              required
              className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Expiry Month: </label>
            <select
              name="expiryMonth"
              id="expiryMonth"
              class="appearance-none w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={form2.expiryMonth}
              onChange={handleChangeForm2}
            >
              <option value={""}>Please Select</option>
              <option value={"1"}>01</option>
              <option value={"2"}>02</option>
              <option value={"3"}>03</option>
              <option value={"4"}>04</option>
              <option value={"5"}>05</option>
              <option value={"6"}>06</option>
              <option value={"7"}>07</option>
              <option value={"8"}>08</option>
              <option value={"9"}>09</option>
              <option value={"10"}>10</option>
              <option value={"11"}>11</option>
              <option value={"12"}>12</option>
            </select>
            {/* md */}
            {/* <input
              name="expiryMonth"
              value={form2.expiryMonth}
              onChange={handleChangeForm2}
              type="number"
              placeholder="Type here"
              required
              className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            /> */}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col">
              <label>Expiry Year: </label>
              <select
                name="expiryYear"
                id="expiryYear"
                class="appearance-none w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                value={form2.expiryYear}
                onChange={handleChangeForm2}
              >
                <option value={""}>Please Select</option>
                <option value={"2024"}>2024</option>
                <option value={"2025"}>2025</option>
                <option value={"2026"}>2026</option>
                <option value={"2027"}>2027</option>
                <option value={"2028"}>2028</option>
                <option value={"2029"}>2029</option>
                <option value={"2030"}>2030</option>
              </select>
              {/* md */}
              {/* <input
                name="expiryYear"
                value={form2.expiryYear}
                onChange={handleChangeForm2}
                type="number"
                placeholder="Type here"
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              /> */}
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
                required
                className="input input-bordered input-md w-full max-w-xs border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            className="p-2 bg-indigo-500 m-8 rounded-md text-black"
            onClick={handleForms}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinindiTest;
