import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import axios from 'axios'
import axiosInstance from '../services/axiosInstance'
const Home = () => {
  const [amount,setAmount]=useState();
  useEffect(
    ()=>{
     if ( localStorage.getItem('Token')) {

      axiosInstance
      .get("http://localhost:4000",localStorage.getItem('Token'))
      .then((res)=>{
        console.log(res.data)
        console.log(res.data.totalAmount)
        setAmount(res.data.totalAmount)
      })
      }
     }
    
   )
 
  return (
    <AuthCheck>
      
      <>
      <div className={classes.maincontainer}>
      <h4 >Your Balance </h4>
      <h1 >${amount}</h1>
      <h3>Add new transaction</h3>
      <form >
        <div >
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value=''
          
            placeholder="Enter text..."
          />
        </div>
        <label htmlFor="income">Type</label>
        <select
          name="income"
          value=''
        
        >
            <option value="Income"> Income </option>
            <option value="Expense"> Expense</option>
          </select>
          
<div class="relative">
<label htmlFor="date">
              Date <br />
            </label>
  <input type='date' />
</div>

          <div  >
            <label htmlFor="amount">
              Amount <br />
            </label>
            <input
              type="number"
              value=''
            
              placeholder="Enter amount..."
            />
              </div>
          <button className={classes.btn}>Add transaction</button>
            </form>
      </div>
    </>


    </AuthCheck>
  )
}

export default Home