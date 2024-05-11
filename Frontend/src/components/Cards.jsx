import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = React.useState(false);

  // Function to extract file name from photoURL
  const extractFileName = (image) => {
    return image.split("\\").pop(); // Split the string by backslash and get the last element
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // add to cart handler
  const handleAddToCart = (item) => {
    const cartItem = {
      menuItemId: item._id,
      quantity: 1,
      email: "frog@gmail.com",
    };

    axios
      .post("http://localhost:6005/carts/", cartItem)
      .then((response) => {
        if (response && response.data) {
          // Display success SweetAlert
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food added to cart",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        // Display error SweetAlert
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to add to cart",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange ${
            isHeartFilled ? "text-rose-500" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="h-5 w-5 cursor" />
        </div>
        <Link to={`/product/${item.id}`} className="card-image">
          <figure>
            <img
              src={`http://localhost:6005/uploads/${extractFileName(
                item.image
              )}`}
              alt="image"
              className="card-image hover:scale-105 transition duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/product/${item.id}`}>
            <h2 className="card-title">{item.name}</h2>
          </Link>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">Rs.{item.price}</h5>
            <button
              className="btn bg-orange"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
