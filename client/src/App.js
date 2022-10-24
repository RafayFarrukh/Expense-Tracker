import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Nav from './components/Nav';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/SignUp';
import Home from './components/Home';
import { ToastContainer,toast } from 'react-toastify'
import Report from './components/Report';


function App() {
  return (
    <>
    <BrowserRouter>
     {/* <Navbar/> */}
     <Nav/>
     <Routes>
     <Route exact path="login" element={<Login />} />
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
