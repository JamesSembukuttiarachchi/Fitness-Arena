import React, { useState, useEffect } from "react";
import axios from "axios";

const Invoice = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // State to hold the subtotal
  const [currentDate, setCurrentDate] = useState(""); // State to hold the current date
  const [invoiceNumber, setInvoiceNumber] = useState(""); // State to hold the invoice number

  useEffect(() => {
    // Fetch cart data from the backend
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6005/cart?email=burger@example.com"
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();

    // Set current date
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Generate unique 5-digit invoice number
    const generateInvoiceNumber = () => {
      const randomNum = Math.floor(10000 + Math.random() * 90000); // Random number between 10000 and 99999
      return randomNum.toString().substring(0, 5); // Convert to string and get the first 5 digits
    };

    setInvoiceNumber(generateInvoiceNumber());
  }, []);

  // Calculate subtotal whenever cartItems change
  useEffect(() => {
    const calculateSubtotal = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  return (
    <div>
      <section class="py-20 overflow-hidden relative">
        <div class="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
          <a
            href="javascript:window.print()"
            className="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="pe-3"
              >
                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
            </span>
            Print
          </a>
        </div>

        <div className="container">
          <div className="bg-white rounded-t-3xl md:p-16 p-10">
            <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
              <div>
                <span className="text-lg font-bold">Bill to:</span>
                <h4 className="text-base font-bold">Dwyane Clark</h4>
                <p className="text-sm font-medium tracking-widest my-1">
                  24 Dummy Street Area,
                </p>
                <p className="text-sm font-medium tracking-widest my-1">
                  Location, Lorem ipsum,
                </p>
                <p className="text-sm font-medium tracking-widest my-1">
                  570xx59x
                </p>
              </div>
              <div className="border-s border-gray-900 ps-8">
                <img src="" alt="" />
                <p className="text-sm font-medium tracking-widest mt-3">
                  Company Address,
                </p>
                <p className="text-sm font-medium">Lorem, ipsum Dolor,</p>
                <p className="text-sm font-medium">845xx145</p>
              </div>
            </div>

            <div className="flex items-center justify-between my-10">
              <h4 className="text-5xl font-semibold uppercase tracking-widest">
                Invoice
              </h4>
              <div>
                <p className="text-base font-semibold">
                  Invoice #{" "}
                  <span className="ps-10 text-sm">{invoiceNumber}</span>
                </p>
                <p className="text-base font-semibold">
                  Date: <span className="ps-10 text-sm">{currentDate}</span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="border-collapse table-auto w-full text-sm mt-10 whitespace-pre">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 border border-e-0 uppercase text-lg font-medium text-start">
                      Product Description
                    </th>
                    <th className="p-4 border-y uppercase text-lg font-medium ">
                      Price
                    </th>
                    <th className="p-4 pe-7 border-y uppercase text-lg font-medium">
                      Qty
                    </th>
                    <th className="p-4 border border-s-0 uppercase text-lg font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-5 text-base font-medium border">
                        {item.name}
                      </td>
                      <td className="p-5 text-base font-medium border text-center">
                        ${item.price}
                      </td>
                      <td className="p-5 text-base font-medium border text-center">
                        {item.quantity}
                      </td>
                      <td className="p-5 text-base font-medium border text-center">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-8 text-base font-medium border"></td>
                    <td className="p-8 text-base font-medium border text-center"></td>
                    <td className="p-8 text-base font-medium border text-center"></td>
                    <td className="p-8 text-base font-medium border text-center"></td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td
                      colspan="4"
                      className="p-1 ps-5 text-base font-medium border"
                    >
                      comments
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="5"
                      className="p-5 text-base font-medium border text-end"
                    >
                      <b>Total:</b> ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-teal-600 p-1"></div>
          <div className="bg-black rounded-b-3xl p-7"></div>
        </div>
      </section>
    </div>
  );
};

export default Invoice;
