import React from "react";
import doctorPhoto from "../assets/DoctorPhotos/doctor.jpg";
import BookAppoinment from "./BookAppoinment";

function DoctorDetails() {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
      {/* doctor image */}
      <div>
        <img
          src={doctorPhoto}
          width={200}
          height={200}
          alt="doctor-image"
          className="rounded-lg w-full h-[280px] object-cover"
        />
      </div>
      {/* doctor info */}
      <div className="col-span-2 mt-5 flex px-10 flex-col gap-5  items-baseline">
        <h2 className="font-bold text-2xl">Doctor Name</h2>
        <h2>Phycisian</h2>
       
        <BookAppoinment/>
      </div>

      {/* about doc */}
      
    </div>
    <div className="p-3 border-[1px] rounded-lg mt-5">
    <h2 className="font-bold text-[20px]"> Doctor details</h2>
    <p className="text-gray-500 tracking-wide mt-2">
      Dr. Emily Parker is a passionate and dedicated medical professional
      with over a decade of experience in internal medicine. Graduating with
      top honors from Harvard Medical School, she embarked on a journey to
      provide exceptional healthcare to her patients. Dr. Parker believes in
      a holistic approach to medicine, focusing not only on treating
      ailments but also on promoting overall well-being and preventive care.
      Her expertise lies in diagnosing and managing complex medical
      conditions, with a particular interest in cardiology and preventive
      medicine. Dr. Parker is known for her compassionate bedside manner and
      personalized approach to patient care. 
    </p>
  </div>
  </div>
  );
}

export default DoctorDetails;
