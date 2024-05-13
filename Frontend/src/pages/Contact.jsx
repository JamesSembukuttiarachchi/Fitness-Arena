import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import axios from "axios";
import { useSnackbar } from "notistack";

import {
  FaPhoneSquareAlt,
  FaFacebookMessenger,
  FaHandshake,
} from "react-icons/fa";

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    membershipId: "",
    topic: "",
    feedback: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    membershipId: Yup.string(),
    topic: Yup.string().required("Please select a topic"),
    feedback: Yup.string().required("Feedback details are required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:6005/feedback",
        values
      );
      console.log("Form submitted successfully:", response.data);
      enqueueSnackbar("Successfully Submitted", { variant: "success" });
      resetForm();
      // Navigate to feedbacks page after successful submission
      navigation.navigate("Feedbacks");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Contact">
      <Header />
      <Hero />
      <div className="flex w-full">
        <div className="grid  flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="w-[557px] h-[1183px] flex flex-col p-8">
            {/* Content omitted for brevity */}
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      name="firstName"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      name="lastName"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                      id="grid-email"
                      type="email"
                      placeholder="you@email.com"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-memberID"
                    >
                      Membership ID (if you're already a member)
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                      id="grid-memberID"
                      type="text"
                      placeholder=""
                      name="membershipId"
                    />
                    <ErrorMessage
                      name="membershipId"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-topic"
                    >
                      Subject
                    </label>
                    <Field
                      as="select"
                      id="grid-topic"
                      name="topic"
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray"
                    >
                      <option value="">Select</option>
                      <option value="registrations">Registration</option>
                      <option value="workout schedules">About workout</option>
                      <option value="shopping">Shopping</option>
                      <option value="appointments">Appointments</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="topic"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-feedback"
                    >
                      Feedback Details
                    </label>
                    <Field
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray required:"
                      as="textarea"
                      id="grid-message"
                      placeholder=""
                      name="feedback"
                    />
                    <ErrorMessage
                      name="feedback"
                      component="p"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
