import React, { useState } from "react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import {
  FaPhoneSquareAlt,
  FaFacebookMessenger,
  FaHandshake,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    membershipId: "",
    subject: "",
    feedbackDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="Contact">
      <Header />
      <Hero />
      <div className="flex w-full">
        <div className="grid  flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="w-[557px] h-[1183px] flex flex-col p-8">
            <div className="w-[380px] mb-4 text-black text-[20px] font-bold font-['Poppins'] ">
              CUSTOMER CARE TEAM
            </div>
            <div className="w-[547px] mb-6  text-black text-[20px] font-semibold font-['Poppins']">
              At Fitness Arena we are always here to help, Browse the options
              below to help us direct with your inquiry.
            </div>
            <div className="w-[557px] mb-6 text-black text-[20px] font-semibold font-['Poppins']">
              Our lines are open from 09:00 to 18:00 PM (GMT +04:00) Monday to
              Friday.
            </div>
            <div className="w-[557px] mb-6 text-black text-[20px] font-semibold font-['Poppins']">
              Telephone Numbers
              <br />
              075135442635
              <br />
              075135442635
            </div>
            <div className="w-[557px] mb-6 text-black text-[20px] font-semibold font-['Poppins']">
              EMAIL: ADI@gmail.com
            </div>
            <div className="w-[484px] mb-6">
              <span className="text-black text-[20px] font-semibold font-['Poppins'] ">
                You can also follow us on our Instagram channels by visiting our
                club page{" "}
              </span>
              <span className="text-black text-[20px] font-semibold font-['Poppins'] underline ">
                here.
              </span>
            </div>
            <div className="w-[517px]  mb-6 text-black text-[20px] font-semibold font-['Poppins']">
              If you have any feedback or questions, please contact us by
              filling out this form or via the preferred method/ways below:{" "}
            </div>
            <div className="w-[517px]  mb-4 flex items-center justify-normal gap-4 text-black text-[20px] font-semibold font-['Poppins']">
              <div>
                <FaPhoneSquareAlt />
              </div>
              <div>Call Us</div>
            </div>
            <div className="w-[517px]  mb-4 flex items-center justify-normal gap-4 text-black text-[20px] font-semibold font-['Poppins']">
              <div>
                <FaFacebookMessenger />
              </div>
              <div>Contact us on Messenger</div>
            </div>
            <div className="w-[517px]  mb-4 flex items-center justify-normal gap-4 text-black text-[20px] font-semibold font-['Poppins']">
              <div>
                <FaHandshake />
              </div>
              <div>Join out Team</div>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid flex-grow card bg-base-300 rounded-box p-8">
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                  id="grid-email"
                  type="email"
                  placeholder="you@email.com"
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-memberID"
                >
                  Membership ID if you're already a member
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                  id="grid-memberID"
                  type="text"
                  placeholder=""
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-subject"
                >
                  Subject:
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                  required
                >
                  <option value="">Select</option>
                  <option value="Registration">Registration</option>
                  <option value="workout shedule">About workout</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Appointments">Appointments</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-message"
                >
                  Message
                </label>
                <textarea
                  className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray required:"
                  id="grid-message"
                  type="text"
                  placeholder=""
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
