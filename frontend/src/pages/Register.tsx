import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Register() {
  // console.log(import.meta.env.BACKEND_PORT,'sljdfkhks');

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );

      console.log(data);

      if (data) {
        if (data.errors) {
        }
      }
    } catch (error: any) {
      console.log("--------------------");

      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Register account{import.meta.env.BACKEND_PORT}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row">
            <label htmlFor="Name"></label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="form-row">
            <label htmlFor="Email"></label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="form-row">
            <label htmlFor="Phone number"></label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="form-row">
            <label htmlFor="Password"></label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="form-row">
            <button type="submit">Register</button>
          </div>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
