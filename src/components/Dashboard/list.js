import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { server_url } from "../../constant";


//dependent
const deleteDataURL = server_url +"/api/v1/url/delete";
const baseurl = server_url + "api/v1";

const List = ({ data, fetchData }) => {
  // delete Api for deletin specfic data
  async function deleteItem(id, e) {
    e.preventDefault();
    try {
      const response = await axios.delete(`${deleteDataURL}/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchData();
    } catch (error) {
      // console.error('Error deleting Id:', error);
    }
  }

  //function to truncate the url upto given characters
  function truncate(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  }

  return (
    <>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md mb-6 md:flex justify-between">
        <div className="mb-4 md:px-2 md:w-2/6">
          <p className="font-bold text-xl mb-2">Short URL Id</p>
          <span className="text-md font-semibold">
            {`${baseurl}/${data.shortId}`}
          </span>
        </div>
        <div className="mb-4  md:px-2  md:w-2/6">
          <p className="font-bold text-xl mb-2 xl:mb-4">Long URL</p>
          <div className="text-md font-semibold overflow-hidden ">
            <span title={data.redirectURL}>
              {truncate(data.redirectURL, 40)}
            </span>
          </div>
        </div>
        <div className="mb-4 md:px-2  md:w-1/6">
          <p className="font-bold text-xl mb-2">Number of visits </p>
          <div className="md:flex justify-center text-lg font-semibold">
            {data.totalClicks}
          </div>
        </div>
        <div className="flex justify-center md:px-2  md:w-1/6">
          {/* <div className='mr-8'><button><CiEdit className='text-3xl' /></button></div> */}
          <div>
            <button
              onClick={(e) => {
                deleteItem(data.shortId, e);
              }}
            >
              <MdDelete className="text-3xl mt-3" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
