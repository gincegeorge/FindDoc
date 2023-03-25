import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export default function Login() {

  


  //handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <h2>Login account</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row">
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className="form-row">
            <label htmlFor="password"></label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div className="form-row">
            <button type="submit">Login</button>
          </div>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
}
