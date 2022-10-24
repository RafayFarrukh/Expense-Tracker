import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import axios from 'axios'
import axiosInstance from '../services/axiosInstance'
import moment, * as moments from 'moment';

const Form = () => {
    const initialFormState = {  name: "", amount: ""  ,category: "", date: "" };
    const [userdata, setUser] = useState(initialFormState);
    const options = [
        "Income",
        "Expenses",
        
      ];
    const handleInputChangeAdd = event => {
        const { name, value } = event.target;
        setUser({ ...userdata, [name]: value });
      };
      const token = localStorage.getItem('Token') //Or however you choose to get it
    
  const onSubmit = (e) => {
    const user=localStorage.getItem('User')
    const userid= JSON.parse(user)

    e.preventDefault();
   axiosInstance.post('http://localhost:4000/expenses/new',{
    name:userdata.name,
    amount:userdata.amount,
    category:userdata.category,
    date:userdata.date,
    
    UserId: userid.id


            
   }
   ,{ 'headers': { 'x-auth-token': token } })
   .then(res=>{
    window.location.reload();
    console.log(res.data)
   })
 
  // console.log({
  //   name:userdata.name,
  //   amount:userdata.amount,
  //   category:userdata.category,
  //   date:userdata.date,
  //   UserId: userid.id
  // });
  };
  return (<div className={classes.FormContainer}> <form onSubmit={onSubmit} className={classes.form}>
     
        
    <label htmlFor='text' className={classes.labelfields}>Name</label>
    <input
      type="text"
      name='name'
    
      value={userdata.name}
      onChange={handleInputChangeAdd}
      placeholder="Enter name..."
    />
 
 

  <label htmlFor='category'>Type</label>
  <select
    name="category"
    onChange={handleInputChangeAdd}
    >
  {options.map((option, index) => {
            return (
              <option
                defaultValue="Income"
                value={options.value}
                key={index}
              >
                {option}
              </option>
            );
          })}
    </select>
     <label htmlFor="date">
       
                      Date <br />
                    </label>
          <input
          type='date'
          name='date'
     
          value={userdata.date}
          onChange={handleInputChangeAdd}
      
            />
    


    
      <label htmlFor="amount">
        Amount <br />
      </label>
      <input
        type="number"
        name='amount'
   
        value={userdata.amount}
        onChange={handleInputChangeAdd}
        placeholder="Enter amount..."
      />
       
    <button className={classes.btn}>Add transaction</button>
      </form></div>
   
    
  )
}

export default Form