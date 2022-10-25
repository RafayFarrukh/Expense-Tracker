import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import classes from './Home.module.css'
import * as yup from "yup";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const initialFormState = {  name: "", email: ""  ,password: ""};
  const [userdata, setUser] = useState(initialFormState);

  const { handleSubmit, getFieldProps, touched, errors, isValid } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup
      .string()
      .required("Username is Required")
      .min(5, "Username must be more then 5 characters"),
      email: yup
        .string()
        .required("E-mail is Required!")
        .email("E-mail Invalid"),
      password: yup
        .string()
        .required("Password is Required")
        .matches(/(?=[a-zA-Z])/, "A senha deve conter ao menos 1 letra")
        
        .min(5, "Password must be atleast 5 characters"),
    
    }),
    onSubmit: values => {
      // const registerData = {
      //   email: values.email.toLocaleLowerCase(),
      //   password: values.password,
      //   name: values.name
          
      // };
      axios
      .post("http://localhost:4000/users/register", {
        name:values.name,
        email:values.email,
        password:values.password,
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
      // console.log(registerData);
    }
  });

 
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
                <label className="block mb-3">
                  <PersonIcon />
                  <span className="text-gray-700  ml-2 mt-10 font-bold">
                    User Name
                  </span>

                  <input
                    name="name"
                    type="text"
                    className={classes.inputsignup}
                    // required
                    // value={values.name}
                    {...getFieldProps("name")}
                   
     
                    minlength="5"
                    placeholder="User name"
                  />
                </label>
             
                {touched.name && errors.name ? <small>{errors.name}</small> : null}
                <label className="block mb-3">
                  <EmailIcon />
                  <span className="text-gray-700 ml-2 font-bold">
                    {" "}
                    Email address
                  </span>
                  <input
                    name="email"
                    className={classes.inputsignup}
                    
                    type="email"
                    // value={values.email}
                    {...getFieldProps("email")}
                
    
                    placeholder="Email"
                    // required
                  />
                </label>

                {touched.email && errors.email ? <small>{errors.email}</small> : null}
            
                <label className="block mb-3">
                  <LockIcon />
                  <span className="text-gray-700 ml-2 font-bold">Password</span>
                  <input
                    name="password"
                    type="password"
                    // value={values.password}
                    {...getFieldProps("password")}
                    className={classes.inputsignup}
              
   
                    minlength="5"
                    placeholder="Password"
                    // required
                  />
                </label>
                {touched.password && errors.password ? <small>{errors.password}</small> : null}
             

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