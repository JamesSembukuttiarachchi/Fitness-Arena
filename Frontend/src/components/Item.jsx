import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Item = ({ id, name, price, category, image }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div className="relative flexCenter group overflow-hidden transition-all duration-100">
        <Link to={`product/${id}`}

          className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 
        !py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700"
        >
          <FaSearch
            className="scale-125 hover:rotate-90 hover:scale-125 transition-all
         duration-700"
          />
        </Link>

        <img
          src={image}
          alt="product img"
          className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"
        />
      </div>

      <div className="p-8 overflow-hidden">
        <h3 className=" my-[6px] font-medium line-clamp-2 text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-700">{price}</p>
      </div>
    </div>
  );
};

export default Item;
