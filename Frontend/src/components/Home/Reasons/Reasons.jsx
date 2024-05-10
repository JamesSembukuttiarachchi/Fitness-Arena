import React from "react";
import "./Reasons.css";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import image4 from "../../../assets/image4.png";
import nb from "../../../assets/nb.png";
import nike from "../../../assets/nike.png";
import adidas from "../../../assets/adidas.png";
import tick from "../../../assets/tick.png";

const Reasons = () => {
  return (
    <div className="Reasons py-0 px-8 flex gap-8" id="reasons">
      <div className="left-r grid flex-1 grid-cols-3 gap-4 auto-rows-[1fr]">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
      </div>
      <div className="right-r flex-1 uppercase gap-4 flex flex-col">
        <span>some reasons</span>
        <div>
          <span className="stroke-text">why </span>
          <span>choose us?</span>
        </div>
        <div className="details-r flex flex-col gap-4">
          <div>
            <img src={tick} alt="" />
            <span>OVER 140+ EXPERT COACHS</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>TRAIN SMARTER AND FASTER THAN BEFORE</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>1 FREE PROGRAM FOR NEW MEMBER</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>RELIABLE PARTNERS</span>
          </div>
        </div>
        <span className="text-ngray font-normal">out partners</span>
        <div className="partners flex gap-4">
          <img src={nb} alt="" />
          <img src={nike} alt="" />
          <img src={adidas} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Reasons;
