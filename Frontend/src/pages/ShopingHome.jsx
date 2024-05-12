import React from "react";
import Banner from "../components/Banner";
import PopularCategories from "./PopularCategories";
import Latest from "../components/Latest";

 const ShoppingHome = () => {
  return (
    <div>
      <Banner />
      <Latest />
      <PopularCategories />
    </div>
  );
};

export default ShoppingHome;
