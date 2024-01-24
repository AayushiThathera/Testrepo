import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AppRoute from "./routes/routes";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  const [fetchdata, setFetchdata] = useState([]);

  const testAPI = () => {
    let formData = { name: "ABCD", email: "abcd@mail.com" };
    axios
      .post("http://localhost:8000/register", formData)
      .then((res) => {
        Swal.fire({
          title: "Data Submitted Successfully",
          icon: "success",
        });
        console.warn("RES", res);
      })
      .catch((err) => {
        console.error("ERROR", err);
      });
  };

  return (
    <div>
      {/* <button onClick={testAPI}>Button</button> */}
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
      {/* <Register /> */}
    </div>
  );
};

export default App;
