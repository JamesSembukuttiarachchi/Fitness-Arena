import React from "react";
import LATEST from "../assets/data/latest.js";
import Item from "./Item";

const Latest = () => {
  return (
    <div className="py-12 xl:py-28">
      <div class="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-blue-950  before:content-[''] after:h-px after:flex-1 after:bg-blue-950  after:content-[''] font-extrabold text-3xl">
        LATEST PRODUCTS
      </div>

      {/*container */}

      <div className="section-container grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {LATEST.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Latest;
