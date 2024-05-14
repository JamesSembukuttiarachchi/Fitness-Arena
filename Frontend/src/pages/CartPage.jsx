import React, { useContext, useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  console.log(cart);
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems)

  // Function to extract file name from photoURL
  const extractFileName = (image) => {
    return image.split("\\").pop(); // Split the string by backslash and get the last element
  };

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.menuItemId.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6005/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6005/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:6005/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 py-28 flex flex-col items-center justify-center">
        <div className="text-center space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Items Added to The <span className="text-Aorange">Cart</span>
          </h2>
        </div>
      </div>

      {/* Cart table */}
      {cart.length > 0 ? (
        <div>
          <div className="overflow-x-auto mt-8">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-Aorange text-white">
                <tr>
                  <th className="py-2 px-4">Food</th>
                  <th className="py-2 px-4">Item Name</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200 bg-white">
                    <td className="py-2 px-4 flex justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={`http://localhost:6005/uploads/${extractFileName(
                            item.menuItemId.image
                          )}`}
                          alt="Item"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 font-medium">
                      <div className="flex flex-row justify-center">
                        {item.menuItemId.name}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex flex-row justify-center">
                        <button
                          className="btn btn-xs bg-gray-200 text-gray-700"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-xs bg-gray-200 text-gray-700"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex flex-row justify-center">
                        Rs.{calculateTotalPrice(item).toFixed(2)}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex flero  justify-center">
                        <button
                          className="btn btn-sm text-red-500"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              {/* Customer details */}
              <p>Your Email: {user?.email}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">Rs.{orderTotal.toFixed(2)}</span>
              </p>
              <Link to="/minindi">
              <button className="btn btn-md bg-Aorange text-white px-8 py-1">
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="mb-3">Cart is empty. Please add products.</p>
          <Link to="/store">
            <button className="btn btn-md bg-Aorange text-white">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
