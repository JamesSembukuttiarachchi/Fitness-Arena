import { createContext, useState } from "react";
import all_products from "../assets/data/all_products.js";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart ={};

    for (let index = 0; index < all_products.length + 1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider =(props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
    }

    const contextValue = {all_products, cartItems, addToCart, removeFromCart };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;