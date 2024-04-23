import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { TbTrash } from "react-icons/tb";

const CartItems = () => {
  const { getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);

  /*// Calculate total price of all items in the cart
  const totalCartPrice = all_products.reduce((total, product) => {
    if (cartItems[product.id] > 0) {
      return total + product.price * cartItems[product.id];
    }
    return total;
  }, 0);*/
  

  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-20 pt-28">
      <table className="w-full mx-auto">
        <thead>
          <tr className="bg-slate-900/10 text-start py-12">
            <th className="p-1 py-2">Products</th>
            <th className="p-1 py-2">Title</th>
            <th className="p-1 py-2">Price</th>
            <th className="p-1 py-2">Quantity</th>
            <th className="p-1 py-2">Total</th>
            <th className="p-1 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_products.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <tr
                  key={e.id}
                  className="border-b border-slate-900/20 p-6 text-center"
                >
                  <td>
                    <img src={e.image} alt="prdImg" height={43} width={43} />
                  </td>
                  <td>
                    <div>{e.name}</div>
                  </td>
                  <td>${e.price}</td>
                  <td>{cartItems[e.id]}</td>
                  <td>${e.price * cartItems[e.id]}</td>
                  <td>
                    <div>
                      <TbTrash onClick={() => removeFromCart(e.id)} />
                    </div>
                    {/* You might want to add a button here to remove the item from the cart */}
                  </td>
                </tr>
              );
            }
            return null; // Avoid returning undefined when not rendering the row
          })}
        </tbody>
      </table>

      <div>Total Price: ${getTotalCartAmount()}</div>
      <div>{cartItems[1]}</div>
    </section>
  );
};

export default CartItems;
