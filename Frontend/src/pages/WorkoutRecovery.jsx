import React from "react";
import Navbar from "../components/Navbar";
import InjuryPage from "./InjuryPage";
import Layout from "../components/Layout/Layout";

const WorkoutRecovery = () => {
  return (
    <Layout>
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Payments tool for software companies
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                From checkout to global sales tax compliance, companies around
                the world use Flowbite to simplify their payment stack.
              </p>
              <a
                href="/appoinments"
                className=" bg-orange-500 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-orange-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Meet a Doctor
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Speak to Sales
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>
        <InjuryPage />

        {/* buttons to appointment */}
        <div>
          <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
            <div className="container mx-auto flex flex-col items-center justify-center max-w-lg p-4 lg:max-w-full sm:p-10 lg:flex-row">
              <div className="flex flex-col items-center justify-center flex-1 p-4 pb-8 sm:p-8 lg:p-16 dark:bg-gray-50">
                <span className="text-sm">Basic</span>
                <p className="text-5xl font-bold text-center">39€</p>
                <p className="font-semibold mb-4">
                  Nemo deserunt possimus quo provident recusandae! Dolores qui
                  architecto omnis pariatur eos voluptatibus sequi cum, non
                  nesciunt aspernatur a?
                </p>
                <a
                  href="/physioapp"
                  className="btn btn-wide bg-orange-500 text-white rounded-lg mt-4"
                >
                  {" "}
                  {/* Added link and margin top */}
                  Meet our Physiotherapist
                </a>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4 pb-8 text-center rounded-md sm:p-8 lg:p-16 dark:bg-violet-600 dark:text-gray-50">
                <span className="text-sm font-semibold">Advanced</span>
                <p className="text-5xl font-bold">89€</p>
                <p className="font-semibold mb-4">
                  {" "}
                  {/* Added margin bottom */}
                  Nemo deserunt possimus quo provident recusandae! Dolores qui
                  architecto omnis pariatur eos voluptatibus sequi cum, non
                  nesciunt aspernatur a?
                </p>
                <a
                  href="/appoinments"
                  className="btn btn-wide bg-orange-500 text-white rounded-lg mt-4"
                >
                  {" "}
                  {/* Added link and margin top */}
                  Book a Doctor
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
