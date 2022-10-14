import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/SignUp';
import Home from './components/Home';
import { ToastContainer,toast } from 'react-toastify'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route exact path="login" element={<Login />} />
     <Route exact path="signup" element={<Signup/>} />
     <Route exact path="home" element={<Home/>} />
     </Routes>
    </BrowserRouter>
    <ToastContainer  position="top-right"  />
    </>
  );
}

export default App;
