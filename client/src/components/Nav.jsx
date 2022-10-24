import React, { useState,useEffect } from "react";
import { Transition } from "@headlessui/react";
import Popper from "popper.js";
import { Link, useLocation,useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                
              </div>
              <h1 className="m-4 text-white flex justify-start ">Expense Tracker</h1>
              <div className="hidden md:block   flex  justify-end  ">
       
                <div className="ml-10 flex items-baseline space-x-8   justify-end">

                        {localStorage.getItem("User") ? (
                            <>
                            
                            <Link
                            to="/home"

                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            to='/report'
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Report
                        </Link>
                        {/* <Link
                        
                             className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"

                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.removeItem("Token");
                                localStorage.removeItem("User");
                                // window.location.reload("/");
                            navigate("/login")
                            
            
                            }}
                            >
                            Logout
                            </Link> */}
                                      
                                      <Link
                                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"

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
                className="block mt-2  -ml-6 text-black bg-gray-600 text-white px-1 py-2  w-1/2 rounded-md text-sm font-medium"

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


                            
                            </>
                        ):(
                            <>
                            
                            <Link
                            to="/login"

                            className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"

                            className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Signup
                        </Link>
                            
                            </>
                        )}
                               
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
             <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {localStorage.getItem("User") ? (
                    <>

                <Link
                    to="/home"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>

                <Link
                    to='/report'
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Report
                </Link>

                <Link
               
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("Token");
                    localStorage.removeItem("User");
                   navigate("/login")

                  }}
                >
                  Logout
                </Link>

                    </>
                ):(
                    <>
                    
                    <Link
                                      to='/login'

                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>

                <Link
                                  to='/signup'

                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Signup
                </Link>
                    
                    </>
                )}


            
              </div>
            </div>
          )}
        </Transition>
      </nav>

    
    
    </div>
  );
}

export default Nav;
