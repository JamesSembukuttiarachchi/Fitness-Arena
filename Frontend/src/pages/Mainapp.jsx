import React from 'react';
import { Link } from 'react-router-dom';

const Mainapp = () => {
  return (
    <>
    <br/>
      <div className="text-2xl font-bold text-black font-inter">
        Availability
      </div>
      <br/>
      <div className="flex justify-center">
        <div className="flex flex-col items-center mx-20 shadow-xl w-60 card bg-base-100">
          <figure>
            <img src="src/images/gym_boy.png" alt="" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Male coach</h2>
            <p>Kasun Fernando</p>
            <div className="justify-center card-actions">
            <Link to ={"/appform"}>
              <button className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-md">
              Book Now
              </button></Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mx-20 shadow-xl w-60 card bg-base-100">
          <figure>
            <img src="src/images/gym_girl.png" alt="" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Female coach</h2>
            <p>Dilka Perera</p>
            
            <div className="justify-center card-actions">
            <p> </p>
            <Link to ={"/appform"}>
              <button className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-md">
              Book Now
              </button></Link>
            </div>
          </div>
        </div>
      </div>
     
<br/>
<div>
<h1>
  <b>Trainers</b>
  <div className="text-sm opacity-50">Fitness Arena</div>
</h1>
  
</div>
<br/>

<div className="mx-20 overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className='mx-20'>Trainer</th>
        <th className='mx-20'>Monday</th>
        <th className='mx-20'>Tuesday</th>
        <th className='mx-20'>Friday</th>
        <th className='mx-20'>Sunday</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td className="kasun">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src="src/images/gym_boy.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="mx-20 font-bold">Kasun Fernando</div>
              <div className="mx-20 text-sm opacity-50">Male coach</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
      </tr>
      {/* row 2 */}
      <br/>
      <tr>
        <td className="dilka">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src="src/images/gym_girl.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="mx-20 font-bold">Dilka Perera</div>
              <div className="mx-20 text-sm opacity-50">Female coach</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
        <td className="px-4 py-2">9:00-10.00 A.M</td>
      </tr>
    </tbody>
  </table>
</div>

    </>
  );
};

export default Mainapp;
