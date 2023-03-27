import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const logOut = ()=>{
    navigate('/login')
  }

  return (
    <div className="home">
      <div>Home page</div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}
