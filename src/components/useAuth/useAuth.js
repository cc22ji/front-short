import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server_url } from "../../constant";


//dependency
const redirectURl = server_url +"/api/v1/user/auth";


const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userdata, setUserdata] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(redirectURl, { withCredentials: true });

      // it indicates whether the user is authorized
      if (response?.data?.authorized === true) {
        setIsLoggedIn(true);
        setUserdata(response?.data?.info);
      } else {
        navigate("/login");
        setIsLoggedIn(false);
      }
    } catch (error) {
      // console.error("Fetching data error.auth", error);
      setIsLoggedIn(false);
      setUserdata("");
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return { isLoggedIn, userdata };
};

export default useAuthentication;
