import React from "react";
import {BrowserRouter, Outlet, Route, Routes as Router} from "react-router-dom";
import Login from "./Public/Login/Login";
import Home from "./Private/Home/Home";

export const Routes = () => {

  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Router>
    </BrowserRouter>
  )

}