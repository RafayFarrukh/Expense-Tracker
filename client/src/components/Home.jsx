import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import axios from 'axios'
import axiosInstance from '../services/axiosInstance'
const Home = () => {
  const [balance,setBalance]=useState()
  const [amount,setAmount]=useState(0);
  const [name, setname] = useState("");
  
  const [category, setType] = useState("Income");
  const [date,setDate]=useState()
   
  // const user1=localStorage.getItem('User')
  // const userid= JSON.parse(user1)
  // const initialFormState = {UserId: userid.id, name: "", amount: ""  ,category: "" , date: ""};
  // const [user, setUser] = useState((initialFormState));

  // const handleInputChangeAdd = event => {
  //   const { name, value } = event.target;
  //   setUser({ ...user, [name]: value });
  // };
 
  const token = localStorage.getItem('Token') //Or however you choose to get it
console.log(token);      
  const onSubmit = (e) => {
    const user=localStorage.getItem('User')
    const userid= JSON.parse(user)

    e.preventDefault();
   axiosInstance.post('http://localhost:4000/expenses/new',{
    name:name,
    amount:amount,
    category:category,
    date:date,
    UserId: userid.id

   }
   ,{ 'headers': { 'x-auth-token': token } })
   .then(res=>{
    // window.location.reload();
    console.log(res.data)
   })
 
  

   console.log({
    name:name,
    amount:amount,
    category:category,
    date:date,
    UserId: userid.id

   });
  };

  const getData = () => {

     
 

    //  if ( localStorage.getItem('Token')) {

console.log(token);
      axiosInstance
      // axios
      .get("http://localhost:4000" ,{ 'headers': { 'x-auth-token': token } })
      .then((res)=>{
        console.log(token)
                console.log(res.data)

              
                  var result = res.data.records.find(item => item.UserId);

                  console.log(result.UserId);

                

              const user=localStorage.getItem('User')
              const userid= JSON.parse(user)

                          
                    if (result.UserId==userid.id) {
                      setBalance(
                        res.data.totalAmount
              
                          )
                      console.log("hiii")
                    }




      }
      ).then(
        ()=>{
          console.log("kk")
        }
      ) 
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
      
    // }
   
     }
     useEffect(function () {

      if (token) {
        console.log("token milgya");
        getData();
      }
      
      
    },[]);
 
  return (
    <AuthCheck>
      
      <>
      <div className={classes.maincontainer}>
      <h4 >Your Balance </h4>
      <h1 >${balance}</h1>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
      {/* <form onSubmit={(event)=>{
        onSubmit()
          event.preventDefault();
          setUser(initialFormState);      

      }}> */}
        <div >
          <label htmlFor="text">name</label>
          <input
            type="text"
           
            value={name}
            onChange={(e) => setname(e.target.value)}
            // value={user.name}
            // onChange={handleInputChangeAdd}
            placeholder="Enter name..."
          />
        </div>
        <label htmlFor="income">Type</label>
        <select
          name="income"
          value={category}
          onChange={(e) => setType(e.target.value)}
          // value={user.category}
          // onChange={handleInputChangeAdd}
        
        >
            <option value="Income"> Income </option>
            <option value="Expenses"> Expense</option>
          </select>
          
          <div class="relative">
              <label htmlFor="date">
             
                            Date <br />
                          </label>
                <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                // value={user.date}
                // onChange={handleInputChangeAdd}
            
                  />
          </div>

          <div  >
            <label htmlFor="amount">
              Amount <br />
            </label>
            <input
              type="number"
              
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              // value={user.amount}
              // onChange={handleInputChangeAdd}
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