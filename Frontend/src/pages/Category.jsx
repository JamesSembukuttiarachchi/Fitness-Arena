import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import all_products from "../assets/data/all_products.js";
import Item from "../components/Item";

const Category = ({ category }) => {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-20 py-12 xl:py-28">
      <div>
        <div className="flexBetween my-8 mx-2">
          <h5>
            <span className="font-bold">Showing 1-12 </span>out of 36 products
          </h5>
          <div className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-3xl ring-1 ring-slate-900">
            Sort by <MdOutlineKeyboardArrowDown />
          </div>
        </div>

        {/* container */}

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {all_products.map((item) => {
            if (category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
        <div className="mt-16 text-center">
          <button className="rounded-full bg-white text-orange outline p-4">
            {" "}
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
