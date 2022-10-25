import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import { useFormik ,Formik, Form, Field} from "formik";
import * as yup from "yup";

import axiosInstance from '../services/axiosInstance'


const DummyForm = () => {
    const initialFormState = {  name: "", amount: ""  ,category: "", date: "" };
    const options = [
        'Select Your Category',
          "Income",
          "Expenses",
          
        ];
    const { handleSubmit, getFieldProps, touched, errors, isValid } = useFormik({
        initialValues: {
            name: "", amount: ""  ,category: "", date: ""
        },   
    validationSchema: yup.object({
        name: yup
          .string()
          .required("Description is Required!"),
      
        amount: yup
          .number()
          .required("Amount is Required"),
          date: yup
           .date()
          .required("Date is Required"),
         category:yup
         .string()
         .oneOf([ 
            'Select Your Category',
              "Income",
              "Expenses",
              
            ])
            .required("Category is Required"),
      
      }),    
      onSubmit: values => {
        // e.preventDefault();
        const user=localStorage.getItem('User')
        const userid= JSON.parse(user)
           axiosInstance.post('http://localhost:4000/expenses/new',{
    name:values.name,
    amount:values.amount,
    category:values.category,
    date:values.date,
    
    UserId: userid.id


            
   }
   ,{ 'headers': { 'x-auth-token': token } })
   .then(res=>{
    window.location.reload();
    console.log(res.data)
   })
      console.log(values)
   
      }
})
    const [userdata, setUser] = useState(initialFormState);
  
    const handleInputChangeAdd = event => {
        const { name, value } = event.target;
        setUser({ ...userdata, [name]: value });
      };
      const token = localStorage.getItem('Token') //Or however you choose to get it
    
      

  const onSubmit = (e) => {
    e.preventDefault();
    const user=localStorage.getItem('User')
    const userid= JSON.parse(user)
     


  //  axiosInstance.post('http://localhost:4000/expenses/new',{
  //   name:userdata.name,
  //   amount:userdata.amount,
  //   category:userdata.category,
  //   date:userdata.date,
    
  //   UserId: userid.id


            
  //  }
  //  ,{ 'headers': { 'x-auth-token': token } })
  //  .then(res=>{
  //   window.location.reload();
  //   console.log(res.data)
  //  })
 
 
  };
  return (<div className={classes.FormContainer}> <form onSubmit={handleSubmit} className={classes.form}>
     
        
    <label htmlFor='text' className={classes.labelfields}>Description</label>
    <input
      type="text"
      name='name'
      {...getFieldProps("name")}

      placeholder="Enter name..."

    />
                {touched.name && errors.name ? <small>{errors.name}</small> : null}
 

  <label htmlFor='category'>Type</label>
  <select
    name="category"
    {...getFieldProps("category")}
   
    >
 <option value="">choose category</option>
 <option value="Expenses">Expenses</option>
 <option value="Income">Income</option>
    </select>

    {touched.category && errors.category ? <small>{errors.category}</small> : null}
   

     <label htmlFor="date">
       
                      Date <br />
                    </label>
          <input
          type='date'
          name='date'
         


     
          {...getFieldProps("date")}

          
      
            />
    

    {touched.date && errors.date ? <small>{errors.date}</small> : null}

    
      <label htmlFor="amount">
        Amount <br />
      </label>
      <input
        type="number"
        name='amount'
    


   
        {...getFieldProps("amount")}

        placeholder="Enter amount..."
      />
                {touched.amount && errors.amount ? <small>{errors.amount}</small> : null}
 
       
    <button className={classes.btn}>Add transaction</button>
      </form></div>
   
    
  )
}

export default DummyForm