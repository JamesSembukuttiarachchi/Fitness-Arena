import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards.jsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "orange" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};



const Latest = () => {

  const[products, setProducts] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("src/assets/data/allproducts.json")
    .then((res) => res.json())
    .then((data) => {
      const latest = data.filter((item) => item.category === "latest");
      setProducts(latest)
    });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />
  };
  return (
    <div className="section-container my-20 relative">
      <div class="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-blue-950  before:content-[''] after:h-px after:flex-1 after:bg-blue-950  after:content-[''] font-extrabold text-3xl">
        LATEST PRODUCTS
      </div>

      {/* arrow buttons */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button onClick={() => slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5">
          <FaAngleLeft className="h-8 w-8 p-1" />
        </button>
        <button onClick={() => slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5 bg-orange">
          <FaAngleRight className="h-8 w-8 p-1" />
        </button>
      </div>

      {/*container */}

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {
          products.map((item, i) =>(
            <Cards key={i} item={item}/>
          ))
        }
      </Slider>
    </div>
  );
};

export default Latest;
