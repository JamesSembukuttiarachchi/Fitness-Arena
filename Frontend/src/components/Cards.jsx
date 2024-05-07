import React from "react";
import { Link } from "react-router-dom";
import {FaHeart} from 'react-icons/fa';
import Swal from 'sweetalert2'

const Cards = ({ item }) => {

        const [isHeartFilled, setIsHeartFilled] = React.useState(false);

        const handleAddToCart = (item) => {
                const {id, name, price, image} = item;
                
                const cartItem = {menuItemId: id, name, price,image, quantity: 1};
                //console.log(cartItem);

                fetch("http://localhost:6005/carts", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cartItem),
                })
                .then((res) => res.json())
                .then((data) => {
                        if(data.insertedId){
                                Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                        }
                        });
                }
        
        const handleHeartClick = () => {
                setIsHeartFilled(!isHeartFilled);
        };

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}
                >
                        <FaHeart className="h-5 w-5 cursor" />
                </div>
                <Link to={`/product/${item.id}`} className="card-image">
                    <figure>
                        <img
                            src={item.image}
                            alt="image"
                            className="card-image hover:scale-105 transition duration-200 md:h-72"
                        />
                    </figure>
                </Link>
                <div className="card-body">
                    <Link to={`/product/${item.id}`}><h2 className="card-title">{item.name}</h2></Link>
                    {/*<p>If a dog chews shoes whose shoes does he choose?</p> */}
                    <div className="card-actions justify-between items-center mt-2">
                        <h5 className="font-semibold">Rs.{item.price}</h5>
                        <button className="btn bg-orange" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
