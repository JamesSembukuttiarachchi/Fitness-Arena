import React from 'react';
import imgi from './images/gym.jpg';

const First = () => {
  return (
    <div className="relative text-bg-dark">
     
      <div className="absolute inset-0 flex flex-col items-center justify-center">
      <img src={imgi} className="absolute inset-0 object-cover w-full h-full" alt="..." width={1500} height={500}/>
        
       
        <p className="mt-2 text-sm "><center><h3>"Select your talented trainers" </h3></center></p>
      </div>
    </div>
  );
};

export default First;