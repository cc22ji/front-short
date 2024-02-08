import React, { useEffect, useState } from "react";
import List from "./list";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import useAuthentication from "../useAuth/useAuth";
import Warning from "../warning/warning";
import { server_url } from "../../constant";

//dependent
const redirectURl = server_url + '/api/v1/url/all'


const Dashboard = () => {
  // define all hooks
  const [response, setResponse] = useState([]);
  const [userinfo, setUserinfo] = useState(null);
  //custom Hook
  const { isLoggedIn } = useAuthentication();

  //fetch data using axios
  const fetchData = async () => {
    try {
      const response = await axios.get(redirectURl, {
        withCredentials: true,
      });
      if (response.status === "OK" || response.status === 200) {
        setResponse(response.data.analytics);
        setUserinfo(response.data.user);
      }
    } catch (error) {
      // console.error("Fetching data error.", error, "mmmmm",response.data);
      setUserinfo(error.response?.data?.user);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //if user is not authenticate if goes to another page
  if (!isLoggedIn) {
    return <Warning />;
  }

  //assinging response data inside an componenent through map function
  let listData = "";
  listData =
    response.length > 0
      ? response.map((data, index) => (
          <List
            key={index}
            data={data}
            fetchData={fetchData}
          />
        ))
      : null;

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center mt-16 h-auto ">
        <div className=" w-1/12"></div>
        <div className="bg-blu-400 w-10/12">
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <h3 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 ">
              Hi,<span className="pl-3 capitalize">{`${userinfo?.name}`}</span>
            </h3>
            <div>{listData}</div>
          </div>
        </div>
        <div className=" w-1/12"></div>
      </div>
    </>
  );
};

export default Dashboard;
