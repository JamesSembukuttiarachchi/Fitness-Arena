import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import {useParams} from "react-router-dom";
import ProductHd from '../components/ProductHd';
import ProductDisplay from '../components/ProductDisplay';

const Product = () => {
  const {all_products} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_products.find((e) => e.id === Number(productId));

  if(! product) {
    return <div>Product not found !</div>
  }

  return (
    <section>
      <div className='mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 py-24'>
        <ProductHd product={product}/>
        <ProductDisplay product={product} />
      </div>
    </section>
  )
}

export default Product;