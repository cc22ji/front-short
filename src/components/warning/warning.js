import React from "react";
import { Link } from "react-router-dom";

const warning = () => {
  return (
    <>
      Dear user, Please Login first
      <Link to="/login" className="text-blue-400 underline ml-4">
        Login here
      </Link>
    </>
  );
};

export default warning;
