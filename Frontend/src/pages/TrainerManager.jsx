import React from 'react';
import { Link } from 'react-router-dom';

const TrainerManager = () => {
  return (
    <div>
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
      
      {/* Edit and Delete Buttons */}
      <div className="flex justify-end mt-4">
     <Link to="/tupdate">
        <button className="px-6 py-3 mr-4 font-semibold text-white bg-orange-500 rounded-md">
          Edit
        </button>
        </Link>
        <button className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TrainerManager;
