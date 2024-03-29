import React, { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate,Link } from "react-router-dom";
import useAuthentication from "../useAuth/useAuth";



function Navbar() {
  const [toggle, settogle] = useState(true);
  const Navigate = useNavigate();
  
  const {isLoggedIn,userdata} = useAuthentication();

  function handleUserMenu() {
    settogle(!toggle);
  }
  function handleLogout(){
    document.cookie.replace("token","") 
    Navigate('/login')
  }

  return (
    <>
      <nav className="bg-blue-400 flex flex-warp w-full h-24">
        {/* div one */}
        <div className="w-5/6 flex flex-wrap items-center justify-between mx-auto p-4 pl-12">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="shortner Logo" />
          </Link>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 mr-">
             
             {
                isLoggedIn?(
                    <>
                     <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Dashboard
                </Link>
              </li>
                    </>
                ):(<>
                 <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Signup
                </Link>
              </li>
                </>)
             }
            </ul>
          </div>
        </div>

        {/* div two */}
       
        {
            isLoggedIn?(<>
               <div className="w-1/2 md:w-1/6 bg-blue-400  items-center justify-center pl-20">
          <div className=" items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 mt-8 ml-2"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={handleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full "
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            {/* <!-- Dropdown menu --> */}

            <div
              className={`z-50 relative ${
                toggle ? "hidden" : "visible"
              } my-4 text-base list-none  bg-white divide-y divide-gray-100 rounded-lg shadow`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-md capitalize font-semibold text-gray-900 dark:text-white">
                  {userdata.name}
                </span>
                <span className="block text-sm font-semibold text-gray-500 truncate dark:text-gray-400">
                  {userdata.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/setting"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
            {/* <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button> */}
          </div>
          </div>
            </>):(<>
                <div className="w-1/2 md:w-1/6 bg-blue-400  items-center justify-center my-6 ml-12">
                <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py- me-2 mb-2 h-12  focus:outline-none " onClick={()=>{Navigate('/quote')}}>Get a Quote</button>
                </div>
            </>)
        }
      </nav>
    </>
  );
}

export default Navbar;

