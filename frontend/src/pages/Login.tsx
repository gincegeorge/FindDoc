import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const generateError = (err: any) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );

      console.log(data);

      if (data) {
        if (data.errors) {
          const { name, email, phone, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          
        } else {

          console.log(data);

          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Login{import.meta.env.BACKEND_PORT}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <button type="submit">Login</button>
          </div>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
