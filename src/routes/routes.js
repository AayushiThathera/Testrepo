import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../Main";
import Register from "../Register";
import Login from "../Login";
import TableData from "../TableData";
import UpdateForm from "../UpdateForm";
import Uploadfile from "../Uploadfile";
import Uploadfile1 from "../Uploadfile1";
const AppRoute = () => {
  return (
    <Routes>
      <>
        <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/TableData" element={<TableData />} />
        <Route path="/UpdateForm" element={<UpdateForm />} />
        <Route path="/Uploadfile" element={<Uploadfile />} />
        <Route path="/Uploadfile1" element={<Uploadfile1 />} />
      </>
    </Routes>
  );
};

export default AppRoute;
