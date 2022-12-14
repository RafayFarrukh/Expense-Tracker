import { Formik, Field } from "formik";
import * as Yup from "yup";
import classes from "./Home/Home.module.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, createContext } from "react";
import DatePicker from "./DatePicker";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Description is Required"),
  amount: Yup.number().required("Amount is Required"),
  category: Yup.string().required("Type is Required"),
  date: Yup.date().required("Date is Required"),
});
const DummyForm2 = (props) => {
  const token = localStorage.getItem("Token");

  return (
    <Formik
      initialValues={{
        name: "",
        amount: "",
        category: "",
        date: new Date(),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const user = localStorage.getItem("User");
        const userid = JSON.parse(user);

        axiosInstance
          .post(
            "http://localhost:4000/expenses/new",
            // "/expenses/new",
            {
              name: values.name,
              amount: values.amount,
              category: values.category,
              date: moment(values.date).format("YYYY-MM-DD"),

              UserId: userid.id,
            },
            { headers: { "x-auth-token": token } }
          )

          .then(() => {
            props.setSubmit(true);
            toast.success("Successfully Created Record", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });

            // window.location.reload();
          });
        resetForm({
          name: "",
          amount: "",
          category: "",
          date: new Date(),
        });
      }}
    >
      {(props) => {
        const { touched, errors, handleSubmit } = props;
        return (
          <div className={classes.FormContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                props.setSubmit(true);
              }}
              className={classes.form}
            >
              <label htmlFor="name" className={classes.labelfields}>
                {" "}
                Description
              </label>
              <Field
                name="name"
                type="text"
                placeholder="Enter Description here"
              />
              {touched.name && errors.name ? (
                <small>{errors.name}</small>
              ) : null}
              <label htmlFor="category">Type</label>
              <div class="flex items-center mb-3">
                <label>
                  <Field
                    type="radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="category"
                    value="Expenses"
                  />
                  &nbsp; Expense
                </label>
              </div>
              <div class="flex items-center mb-3">
                <label>
                  <Field
                    type="radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="category"
                    value="Income"
                  />
                  &nbsp; Income
                </label>
              </div>
              {touched.category && errors.category ? (
                <small>{errors.category}</small>
              ) : null}

              <label htmlFor="date">
                Date <br />
              </label>

              <Field name="date" dateFormat="yyyy-MM-dd" as={DatePicker} />
              {touched.date && errors.date ? (
                <small>{errors.date}</small>
              ) : null}

              <label htmlFor="amount">
                Amount <br />
              </label>
              <Field
                name="amount"
                type="number"
                placeholder="Enter Amount here"
              />
              {touched.amount && errors.amount ? (
                <small>{errors.amount}</small>
              ) : null}

              <button className={classes.btn}>Add transaction</button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default DummyForm2;
