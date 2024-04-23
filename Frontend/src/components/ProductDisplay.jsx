import React, { useContext } from "react";
import { MdStar } from "react-icons/md";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <section>
      <div className="flex flex-col gap-14 xl:flex-row">
        <div className="flex gap-x-2 xl:flex-1">
          
                <div className='flex flex-col gap-[7px] flex-wrap'>
                    <img src={product.image} alt='product img' className='max-h-[99px]' />
                    <img src={product.image} alt='product img' className='max-h-[99px]' />
                    <img src={product.image} alt='product img' className='max-h-[99px]' />
                    <img src={product.image} alt='product img' className='max-h-[99px]' />
                </div>
                
          <div>
            <img src={product.image} alt="image"  className="max-h-[420px]"/>
          </div>
        </div>
        <div className="flex-col flex">
          <h3 className="h3">{product.name}</h3>
          <div className="flex gap-x-2 text-orange medium-22">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
          </div>

          <div className="flex gap-x-6 medium-20 my-4">
            <div className="">{product.price}</div>
          </div>

          <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
            <button onClick={() => {addToCart(product.id)}} className="btn_dark_outline !rounded  uppercase tracking-widest">Add to cart</button>
            <button className=" rounded-none p-2 bg-black text-orange uppercase tracking-widest">Buy now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
