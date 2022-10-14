import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import bcrypt from 'bcryptjs'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

// const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
//      console.log(name,email,hashedPassword)     

    axios
      .post("http://localhost:4000/users/register", {
        name:name,
        email:email,
        password:password,
      })
      .then((resp) => {
        console.log(resp.data.user) 
        toast.success('Successfully SignedUp',{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})
        navigate('/login')
      })
      .catch((res) => {
        console.log(res);
        if(res.response.data.success==false){
          toast.error(res.response.data.error,{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})
         }
      }
      );
  };
  return (
    <>
      

      {/* --------------- */}
      <div className="">
        <div className="mt-24 ">
          <div className="w-full md:w-96 md:max-w-full mx-auto shadow-lg">
            <div className="p-6  border-gray-300 sm:rounded-md">
              <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-12 mr-20">
             
                Signup
              </h1>
              <form method="POST" action="" onSubmit={handleSubmit}>
                <label className="block mb-6">
                  <PersonIcon />
                  <span className="text-gray-700  ml-2 mt-10 font-bold">
                    User Name
                  </span>

                  <input
                    name="name"
                    type="text"
                    required
                    onChange={(e) => setname(e.target.value)}
                    className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                    minlength="5"
                    placeholder="User name"
                  />
                </label>

                <label className="block mb-6">
                  <EmailIcon />
                  <span className="text-gray-700 ml-2 font-bold">
                    {" "}
                    Email address
                  </span>
                  <input
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                    placeholder="Email"
                    required
                  />
                </label>
                <label className="block mb-6">
                  <LockIcon />
                  <span className="text-gray-700 ml-2 font-bold">Password</span>
                  <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                    minlength="5"
                    placeholder="Password"
                    required
                  />
                </label>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="
            h-10
            px-5
            text-indigo-100
            bg-sky-600
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-sky-300
            text-black
          "
                  >
                    Sign Up
                  </button>
                  
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;