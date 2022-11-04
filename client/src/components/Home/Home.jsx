import React from "react";
import { useEffect, useState } from "react";
import AuthCheck from "../AuthCheck";
import classes from "./Home.module.css";
import axiosInstance from "../../services/axiosInstance";
import DummyForm2 from "../DummyForm2";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const token = localStorage.getItem("Token");

  const getData = () => {
    axiosInstance
      // .get("http://localhost:4000", { headers: { "x-auth-token": token } })
      .get("/", { headers: { "x-auth-token": token } })
      .then((res) => {
        setIncome(res.data.chartData[0]);
        setExpense(res.data.chartData[1]);
        setBalance(res.data.totalAmount);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  useEffect(function () {
    if (token) {
      getData();
    }
  }, []);

  return (
    <AuthCheck>
      <>
        <div className={classes.container}>
          <div className={classes.maincontainer}>
            <h4 className={classes.yourbalance}>Your Balance </h4>
            {balance > 0 ? (
              <h1 className={classes.money}>{balance > 0 && balance}$</h1>
            ) : <div>
                <h1
                  className={classes.money}
                  style={{
                    color: "red",
                  }}
                >
                  {balance}$
                </h1>
              </div> ? (
              <h1 className={classes.money}>{balance}$</h1>
            ) : (
              <h1 className={classes.money}>{balance}$</h1>
            )}

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

            <h3>Add new transaction</h3>

            <DummyForm2 />
          </div>
        </div>
      </>
    </AuthCheck>
  );
};

export default Home;
