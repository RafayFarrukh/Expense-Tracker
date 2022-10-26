import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import { useFormik ,Formik, Form, useField} from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axiosInstance from '../services/axiosInstance'


const DummyForm = ({ name = "" }) => {
  
    const initialFormState = {  name: "", amount: ""  ,category: "", date: "" };
    // const options = [
    //     'Select Your Category',
    //       "Income",
    //       "Expenses",
          
    //     ];
    const token = localStorage.getItem('Token')
    const[selectedDate,setSelecteDate]=useState(null)
  
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
          // date: yup
          //  .date()
          // .required("Date is Required"),
         category:yup
         .string()
         .oneOf([ 
              "Income",
              "Expenses",
            ])
            .required("Type is Required"),
      
      }),    
      onSubmit: (values)=> {
        // preventDefault();
        const user=localStorage.getItem('User')
        const userid= JSON.parse(user)
        console.log(values);
  //          axiosInstance.post('http://localhost:4000/expenses/new',{
  //   name:values.name,
  //   amount:values.amount,
  //   category:values.category,
  //   date:values.date,
    
  //   UserId: userid.id


            
  //  }
  //  ,{ 'headers': { 'x-auth-token': token } })
  //  .then(res=>{
  //   // window.location.reload();
  //   console.log(res.data)
  //  })

   
      }
})

  

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
           
  <div class="flex items-center mb-3">
                    <input type="radio" id="html" 
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  name="category"   
                      {...getFieldProps("category")}
                      value="Income"/>
                  <label for="html">Income</label>
                </div>
  <div class="flex items-center mb-3">

                  <input type="radio" id="css"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                
                name="category"
                      {...getFieldProps("category")}
                value="Expenses"/>
                  <label for="css">Expense</label>
                </div>

        
 
              
             



    {touched.category && errors.category ? <small>{errors.category}</small> : null}
   
                             
                <label htmlFor="date">       
                                      Date <br />
                                </label>

                        {/* <DatePicker
                        name='date'
                                           {...getFieldProps("date")}
                                  
                                          onChange={(date) =>{
                                            console.log(date);
                                            date.getFieldProps()
                                          }}
                        /> */}
              


                        {/* <DatePicker
                        name='date'
                        selected={selectedDate}
                        format='dd/MM/yyyy'
                        
                        onChange={
                          date=>{
                            setSelecteDate(
                              date.getFieldProps("date")
                              // {...getFieldProps("date")}
                            )
                            console.log(date.toString())
                          
                          
                          
                          }
                        }
                       /> */}

                        

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