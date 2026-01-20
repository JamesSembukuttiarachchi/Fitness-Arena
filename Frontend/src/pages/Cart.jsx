import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // State to hold the subtotal

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
              <td colspan="4" className="p-1 ps-5 text-base font-medium border">
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
        <Link to="/minindi">
          <button className="btn btn-primary">Procced to Payment</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
