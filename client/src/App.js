import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Login from "./modules/login/Login";
import Home from "./modules/home/Home";
import Navbar from "./modules/navbar/Navbar";
import CreateUser from "./modules/create/CreateUser";
import { useDispatch } from "react-redux";
import { fetchLoginUserDet } from "./redux/auth/Auth.actions";
import { getAllUsers } from "./redux/users/users.action";
import EditUser from "./modules/create/edituser";

function App() {
  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchLoginUserDet());     
    // dispatch(getAllUsers());
  },[])

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
