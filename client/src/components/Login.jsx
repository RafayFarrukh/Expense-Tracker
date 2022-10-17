import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

import { useState } from "react";
import Navbar from "./Navbar";
import bcrypt from 'bcryptjs'
import { useContext, useRef } from "react";
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    axios
      .post("http://localhost:4000/users/login", {
        // .post("/api/user/login", {
        // email: email,
        email:email,
        password:password,
      })
      .then((resp) => {
        localStorage.setItem("Token", resp.data.token);
        // localStorage.setItem("Token", JSON.stringify(resp.data.token));
        localStorage.setItem("User", JSON.stringify(resp.data.user));
        
        navigate('/home')
        // setTimeout(function(){
        //   window.location.reload();
        // }, 10);
       console.log(resp.data.user) 
       toast.success('Successfully Logged in',{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})

      })

     
      .catch((res) => {
      console.log(res.response.data);
   if(res.response.data.success==false){
    toast.error(res.response.data.error,{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})
   }
       
      
      });
  };
  return (
    <>
  
      {/* --------------- */}
      <div className="">
        <div className="mt-24 ">
          <div className="w-full md:w-96 md:max-w-full mx-auto shadow-lg">
            <div className="p-6  border-gray-300 sm:rounded-md">
              <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-12 mr-20">
               
                Login
              </h1>
              <form method="POST" action="" onSubmit={handleSubmit}>
              

                <label className="block mb-6">
                  <EmailIcon />
                  <span className="text-gray-700 ml-2 font-bold">
                    {" "}
                    Email address
                  </span>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
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
                    value={password}
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
                    minLength="5"
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
                    Login
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;