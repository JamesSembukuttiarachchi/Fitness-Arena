import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import InjuryPage from "./InjuryPage";
import Layout from "../components/Layout/Layout";
import recPhoto from "../assets/RecoveyGirl.png";

const WorkoutRecovery = () => {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Post Workout Recovery Assistance
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Recover post-workout in our gym oasis. Relax muscles, hydrate,
                and optimize your recovery for stronger returns. Welcome to
                rejuvenation central!
              </p>
              <button
                onClick={scrollToBottom}
                className="bg-orange-500 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-orange-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Meet Our Specialist
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src={recPhoto}
                alt="recovey girl"
                className="mb-2 size-40"
                style={{ width: "100%", height: "auto" }}
              />{" "}
            </div>
          </div>
        </section>
        <InjuryPage />

        {/* buttons to appointment */}
        <div ref={scrollRef}>
          <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
            <div className="container mx-auto flex flex-col items-center justify-center max-w-lg p-4 lg:max-w-full sm:p-10 lg:flex-row">
              <div className="flex flex-col items-center justify-center flex-1 p-4 pb-8 sm:p-8 lg:p-16 dark:bg-gray-50">
                <p className="text-5xl font-bold text-center mb-4">
                  Meet Our Physio
                </p>
                <p className="font-semibold mb-8">
                  Need rehabilitation for your injuries? Schedule a session with
                  our experienced physiotherapist for personalized care and
                  recovery plans
                </p>
                <a
                  href="/physioapp"
                  className="btn btn-wide bg-orange-500 text-white rounded-lg mt-4"
                >
                  Book Now
                </a>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4 pb-8 text-center rounded-md sm:p-8 lg:p-16 dark:bg-violet-600 dark:text-gray-50">
                <p className="text-5xl font-bold mb-4">Meet Our Doctor</p>
                <p className="font-semibold mb-8">
                  Need immediate medical attention? Book an appointment with our
                  expert doctor for personalized care and treatment tailored to
                  your needs.
                </p>
                <a
                  href="/appoinments"
                  className="btn btn-wide bg-orange-500 text-white rounded-lg"
                >
                  Book Now
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutRecovery;
