import axios from "axios";
let axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
   
  },
});
axiosInstance.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  "Token"
)
  // ? localStorage.getItem("Token").toString()
  ? localStorage.getItem("Token") 
  : "";
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
// axiosInstance.interceptors.response.use(
//   response => successHandler(response),
//   error => errorHandler(error)
// );
 
export default axiosInstance;
