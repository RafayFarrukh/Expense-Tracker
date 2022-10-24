import React, { useState } from "react";
import Popper from "popper.js";
import { Transition } from "@headlessui/react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";
import { useEffect } from "react";
const Navbar = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };
//   const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    // dispatch({
    //   type: "LOGOUT",
    // });
  };
const [user,setUser]=useState();
  const User=()=>{
 const user1=    localStorage.getItem('User')
 const user2=JSON.parse(user1)

 setUser(user2.name)
//  console.log(user2.name)
//  console.log(user2);
  }
  useEffect(
   ()=>{
    if ( localStorage.getItem('Token')) {
      const user1=    localStorage.getItem('User')
      const user2=JSON.parse(user1)
     
      setUser(user2.name)
     }
    }
   
  )
  return (
    <>
      <div>
        <nav className="nav-links bg-white bg-gray-100 px-2 sm:px-4 py-2.5  ">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <div className="flex items-center">
             
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Expense Tracker
              </span>
            </div>
            <button
              onClick={handleToggle}
              data-collapse-toggle="mobile-menu"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-100 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-100 dark:focus:ring-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {navbarOpen ? (
                <CloseIcon
                  style={{ color: "#fff", width: "30px", height: "30px" }}
                />
              ) : (
                <MenuIcon
                  style={{ color: "#7b7b7b", width: "30px", height: "30px" }}
                />
              )}
              <span className="sr-only">Open main menu</span>
              <ul className={`menuNav bg-gray-100 ${navbarOpen ? " showMenu" : ""}`}>
                <li>
                  <a
                    to="/"
                    className={(navData) =>
                      navData.isActive ? "active-style" : "none"
                    }
                    onClick={() => closeMenu()}
                    exact
                  >
                  
                  </a>
                </li>
                <li>
                  <Link
                    to="/home"
                    className="block py-2 pr-1 pl-3 text-white  border-b border-yellow-100 hover:bg-yellow-500 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                     <li className="listItem">Home</li>
                  </Link>
                </li>
            
                  <li>
                    <Link
                    //   to="/blogs"
                      className="block py-2 pr-4 pl-3 text-white  border-b border-yellow-100 hover:bg-yellow-500 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("Token");
                        localStorage.removeItem("User");
                        // window.location.reload("/");
                       navigate("/login")
                      
      
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <a
                        // to="/signup"
                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Signup
                      </a>
                    </li>
                  </>
            
                <a
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  to=""
                >
                  <li onClick={handleLogout}>Logout</li>
                </a>
              </ul>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">

              {localStorage.getItem("User") ? (
              <>
                {/* <li className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <a
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    href=""
                   
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("Token");
                      localStorage.removeItem("User");
                      // window.location.reload("/");
                     navigate("/login")
                    

                    }}
                  >
                    Logout
                  </a>
                </li>{" "} */}
                <li>
          <Link to="/home" 
                  onClick={User}

          class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            home</Link>

                      
           



        </li>
                         

        <li className="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        <Link
              className={
                "block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" 
              }
              // style={{ transition: "all 5s ease" }}
              // type="li"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              
             {user}
               
              <ArrowDropDownIcon/>
            </Link>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block "
                 : "hidden ") 
               
              }
              style={{ minWidth: "8rem" }}
            >
           
              <Link
                to="/login"
                className={
                  "block  py-4 pt-5 mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" 
              
                }
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("Token");
                  localStorage.removeItem("User");
                  // window.location.reload("/");
                 navigate("/login")
                

                }}
              >
                Logout
              </Link>
              </div>        
                     </li>

       


              </>
            ) : (
                <>
                <li className="ml-20">
                <Link
                        to="/login"
                    className="block py-2  pr-4 pl-3 text-gray-700 border-b border-yellow-100 hover:bg-yellow-500 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                   <li className="listItem" >Login</li>
                  </Link>
                </li>
                <li className="ml-20">
                <Link
                        to="/signup"
                    className="block py-2  pr-4 pl-3 text-gray-700 border-b border-yellow-100 hover:bg-yellow-500 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                   <li className="listItem">Signup</li>
                  </Link>
                </li>
                </>
            )}


            

              
                
                {/* <a
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  to=""
                >
                  {user && <li onClick={handleLogout}>Logout</li>}
                </a> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;