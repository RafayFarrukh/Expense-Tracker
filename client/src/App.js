import logo from './logo.svg';
import './App.css';

import Nav from './components/Navbar/Nav';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/SignUp';
import Home from './components/Home/Home';
import { ToastContainer,toast } from 'react-toastify'
import Report from './components/Report';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <>
  
    <BrowserRouter>
     {/* <Navbar/> */}
     <Nav/>
     <Routes>
     <Route exact path="/" element={<Dashboard />} />

     <Route exact path="login" element={<Login />} />
     {/* <Route exact path="" element={<Home />} /> */}
     <Route exact path="signup" element={<Signup/>} />
     <Route exact path="home" element={<Home/>} />
     <Route exact path="report" element={<Report/>} />
     
     </Routes>
    </BrowserRouter>
    <ToastContainer  position="top-right"  />
 
    </>
  );
}

export default App;
