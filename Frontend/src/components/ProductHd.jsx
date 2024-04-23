import React from "react";
import {TbArrowRight} from "react-icons/tb";

const ProductHd = (props) => {

    const {product} = props;

  return (
    <div className="flex items-center flex-wrap gap-2 medium-16 font-semibold text-orange my-4 capitalize">
        Home <TbArrowRight /> Shop <TbArrowRight /> {product.category} <TbArrowRight /> {product.name}
    </div>
  )
};

export default ProductHd;
