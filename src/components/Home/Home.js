

    import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import useAuthentication from "../useAuth/useAuth";
import Warning from "../warning/warning";
import { server_url } from "../../constant";


const backendURL = server_url +"/api/v1/url";
const baseurl = server_url + "api/v1"

const Home = () => {
  const { isLoggedIn } = useAuthentication();
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

    // if user is not authorised then show warning component
  if (!isLoggedIn) {
    return <Warning />;
  }

  function handleInput(e) {
    setInput(e.target.value);
    setError(null); // Clear error message when user starts typing
  }

  async function handleData(e) {
    e.preventDefault();

    // Check if input URL is valid
    if (!isValidURL(input)) {
      setError("Invalid URL. Please enter a valid URL.");
      return;
    }

    const url = {
      url: input,
    };
    try {
      const response = await axios.post(backendURL, url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.statusText === "OK") {
        const shortid = response.data.id;
        setResponseData(shortid);
        const short_url = `${baseurl}/${shortid}`;
        setText(short_url);
        setTimeout(() => {
          setInput("");
          setResponseData("");
        }, 20000);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Unable to generate link.");
    }
  }

  return (
    <>
      <div className="z-50"><Navbar /></div>
      <div className="flex flex-wrap justify-center items-center h-auto mt-32 lg:mt-16 xl:mt-32 z-0">
        <div className=" w-1/12"></div>
        <div className="bg-blu-400 w-10/12">
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <h3 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 ">
              Shorten a long link
            </h3>

            <div className="mb-5">
              <label
                htmlFor="text"
                className="block mb-2 text-2xl font-medium text-gray-900 mt-8"
              >
                Paste a long URL
              </label>
              <input
                type="text"
                id="text"
                className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 h-12"
                placeholder="Example: https://example.com"
                value={input}
                onChange={handleInput}
                name="input"
                required
              />
            </div>

            {responseData && (
              <div className="flex ">
                <div className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-5/6 p-2.5 h-12">
                  {responseData}
                </div>
                <div className=" border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-50 focus:border-blue-50  w-1/12 p-2.5 h-12 ml-4 flex ">
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-500 focus:outline-none"
                  >
                    <MdOutlineContentCopy className="text-2xl " />
                  </button>
                  {copied && (
                    <span className="ml-2 text-green-500">Copied!</span>
                  )}
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-lg mt-4">{error}</p>
            )}

            <div className="flex items-center mt-8 ">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 h-12 w-5/6 md:w-1/3 focus:outline-none "
                onClick={handleData}
              >
                Generate your link
              </button>
            </div>
          </div>
        </div>
        <div className=" w-1/12"></div>
      </div>
    </>
  );
};

export default Home;

function isValidURL(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

