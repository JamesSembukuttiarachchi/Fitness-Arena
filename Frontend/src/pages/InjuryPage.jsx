import React, { useEffect, useState } from "react";
import axios from "axios";
import bodyPart1 from "../assets/bodyPhotos/chest.png";
import bodyPart2 from "../assets/bodyPhotos/back.png";
import bodyPart3 from "../assets/bodyPhotos/bicep.png";
import bodyPart4 from "../assets/bodyPhotos/abs.png";
import bodyPart5 from "../assets/bodyPhotos/legs1.png";
import bodyPart6 from "../assets/bodyPhotos/shoulder.png";

const InjuryPage = () => {
  const [injuries, setInjuries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:6005/postworkout")
      .then((response) => {
        setInjuries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredInjuries = injuries.filter((injury) =>
    injury.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-10 items-center flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-5xl tracking-wide">
          Search <span className="text-orange-600">Injury</span>
        </h2>
        <h2 className="text-gray-500 text-xl">
          Search your injury in one click
        </h2>
      </div>

      {/*search Bar*/}
      <div className="mb-10 items-center flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search by injury type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gray-400">
          <img src={bodyPart1} alt="Body Part 1" className="mb-2 size-40" />{" "}
          <div className="uppercase ">chest</div>
        </div>
        <div className="bg-gray-400">
          <img src={bodyPart2} alt="Body Part 1" className="mb-2 size-40" />
          <div className="uppercase ">Back</div>
        </div>
        <div className="bg-gray-400">
          <img src={bodyPart3} alt="Body Part 1" className="mb-2 size-40" />
          <div className="uppercase ">Arms</div>
        </div>
        <div className="bg-gray-400">
          <img src={bodyPart4} alt="Body Part 1" className="mb-2 size-40" />
          <div className="uppercase ">Abs</div>
        </div>
        <div className="bg-gray-400">
          <img src={bodyPart5} alt="Body Part 1" className="mb-2 size-40" />
          <div className="uppercase ">Legs</div>
        </div>
        <div className="bg-gray-400">
          <img src={bodyPart6} alt="Body Part 1" className="mb-2 size-40" />
          <div className="uppercase ">Shoulders</div>
        </div>
      </div>
      <div>
        {/* Display filtered injuries only when search term is not empty */}
      {searchTerm && (
        <div className="mt-8">
          {filteredInjuries.map((injuryItem, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">{injuryItem.type}</h3>
              <p className="text-gray-700 mb-2">{injuryItem.injuryDescription}</p>
              <div>
                <h4 className="font-semibold mb-1">Exercises to Avoid:</h4>
                <ul className="list-disc list-inside">
                  {injuryItem.exercisesToAvoid.map((exercise, idx) => (
                    <li key={idx} className="text-gray-700">{exercise}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <h4 className="font-semibold mb-1">Recovery Methods:</h4>
                <ul className="list-disc list-inside">
                  {injuryItem.recoveryMethods.map((method, idx) => (
                    <li key={idx} className="text-gray-700">{method}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default InjuryPage;
