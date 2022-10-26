import React from 'react'
import { useEffect,useState } from 'react'
import AuthCheck from './AuthCheck'
import classes from './Home.module.css'
import axiosInstance from '../services/axiosInstance'
import { useNavigate } from "react-router-dom";
import Form from './Form'
import DummyForm from './DummyForm'

const Home = () => {
  const navigate = useNavigate();
  const [balance,setBalance]=useState()
  const [amount,setAmount]=useState(0);
  const [name, setname] = useState("");
  const [report,setReport]=useState(false)
  const [category, setType] = useState("Income");
  const [date,setDate]=useState()
  const [formErrors, setFormErrors] = useState({});
                   
  const initialFormState = {  name: "", amount: ""  ,category: "", date: "" };
  const [userdata, setUser] = useState(initialFormState);

const [income,setIncome]=useState(0);
const [expense,setExpense]=useState(0);

  const token = localStorage.getItem('Token') //Or however you choose to get it
     


  const getData = () => {


      axiosInstance
      .get("http://localhost:4000" ,{ 'headers': { 'x-auth-token': token } })
      .then((res)=>{
        
              setIncome(res.data.chartData[1])
              setExpense(res.data.chartData[0])
                  var result = res.data.records.find(item => item.UserId);
                  console.log(result.UserId);
              const user=localStorage.getItem('User')
              const userid= JSON.parse(user)

                          
                    if (result.UserId==userid.id) {
                      setBalance(
                        res.data.totalAmount
              
                          )
                 
                    }

      }
      )
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });

     }
     useEffect(function () {

      if (token) {
      
        getData();
      }
      
      
    },[]);
 

  return (
    <AuthCheck>
      
      <>
      <div className={classes.container}>
      <div className={classes.maincontainer}>
      <h4 className={classes.yourbalance}>Your Balance </h4>
       {balance>0? 
        <h1 className={classes.money}>{balance>0&&balance}$</h1>
       
:(
  <div>
     <h1 className={classes.money} 
       style={
        {
          color:'red'
        }
      }
    
      >
       
        {balance}$</h1>
  </div>
)
}

      {/* <h1 className={classes.money}>${balance>0&&balance}</h1>
      <h1 className={classes.money} 
       style={
        {
          color:'red'
        }
      }
    
      >
       
        ${balance }</h1> */}
      <div className={classes.incexpcontainer}>
        
          <div className={classes.Income}>
              <h4>Income</h4>
              <p className={classes.moneyplus}>{income}</p>
          </div>
          <div className={classes.Expense}>
            <h4>Expense</h4>
            <p className={classes.moneyminus}>{expense}</p>
    
      </div>
     
    </div>
    { report}
    
      <h3>Add new transaction</h3>
      
     {/* <Form/> */}
     <DummyForm/>
            <button className={classes.report} onClick={()=>{
              navigate('/report')
              setReport(true)
              window.location.reload()
            }}>Check Report</button>

      </div>
      </div>
    </>


    </AuthCheck>
  )
}

export default Home