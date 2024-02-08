import React from "react";
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/signup");
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center items-center h-auto mt-32 lg:mt-16 xl:mt-32  ">
        <div className=" w-1/12"></div>
        <div className="w-10/12">
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <h3 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 ">
              Shorten a long link
            </h3>

            <div className="mb-5">
              <label
                for="text"
                className="block mb-2 text-2xl font-medium text-gray-900 mt-8"
              >
                Paste a long URL
              </label>
              <input
                type="text"
                id="text"
                className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 h-12"
                placeholder="Example:Something.com/endpoint"
                required
              />
            </div>

            <div className="flex items-center mt-8 ">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 h-12 w-5/6 md:w-2/3 lg:w-1/3 focus:outline-none "
                onClick={handleNavigate}
              >
                Signup and get your link
              </button>
            </div>
          </div>
        </div>
        <div className=" w-1/12"></div>
      </div>
    </>
  );
};

export default FrontPage;
