import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useState ,React} from "react";
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from './Home.module.css'
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const initialFormState = {   email: ""  ,password: ""};
  const { handleSubmit, getFieldProps, touched, errors, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
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
      console.log(values)
      axios
      .post("http://localhost:4000/users/login", {
        email:values.email,
        password:values.password,
      })
    .then((resp) => {
        localStorage.setItem("Token", resp.data.token);
        localStorage.setItem("User", JSON.stringify(resp.data.user));       
        navigate('/home')
       console.log(resp.data.user) 
       toast.success('Successfully Logged in',{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})

      })
      .catch((res) => {
        console.log(res);
        if(res.response.data.success==false){
          toast.error(res.response.data.error,{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})
         }
      }
      );
      
    }
  });
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
   
  //   axios
  //     .post("http://localhost:4000/users/login", {
  //       email:email,
  //       password:password,
  //     })
  //     .then((resp) => {
  //       localStorage.setItem("Token", resp.data.token);
  //       localStorage.setItem("User", JSON.stringify(resp.data.user));       
  //       navigate('/home')
  //      console.log(resp.data.user) 
  //      toast.success('Successfully Logged in',{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})

  //     })

     
  //     .catch((res) => {
  //     console.log(res.response.data);
  //  if(res.response.data.success==false){
  //   toast.error(res.response.data.error,{position: toast.POSITION.TOP_RIGHT,autoClose: 2000})
  //  }
       
      
  //     });
  // };
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
              

                <label className="block mb-2">
                  <EmailIcon />
                  <span className="text-gray-700 ml-2 font-bold">
                    {" "}
                    Email address
                  </span>
                  <input
                    name="email"
                    {...getFieldProps("email")}

                    type="email"
                    className={classes.inputsignup}
                    placeholder="Email"
                    required
                  />
                </label>
                {touched.email && errors.email ? <small>{errors.email}</small> : null}
                <label className="block mb-2">
                  <LockIcon />
                  <span className="text-gray-700 ml-2 font-bold">Password</span>
                  <input
                    name="password"
                    type="password"
                    {...getFieldProps("password")}

                    className={classes.inputsignup}
                    minLength="5"
                    placeholder="Password"
                    required
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