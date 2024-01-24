// import React, { useEffect, useState } from "react";
// import { Table, Button } from "antd";

// import axios from "axios";
// const TableData = () => {
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:8000/tabledata")
//       .then((response) => response.json())
//       .then((data) => setItems(data));
//     console.log(items);
//   }, []);

//   const columns = [
//     {
//       title: "name",
//       dataIndex: "name",
//     },

//     {
//       title: "email",
//       dataIndex: "email",
//     },
//     {
//       title: "delete",
//       dataIndex: "delete",
//     },
//   ];
//   return (
//     <div>
//       <p>Form Data</p>

//       <Table columns={columns} dataSource={items} size="middle" />
//     </div>
//   );
// };
// export default TableData;
import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const TableData = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  function handleDelete(item) {
    let emailData = { email: item.email };
    axios
      .post("http://localhost:8000/deleteRecord", emailData)
      .then((res) => {
        fetchData(); // Fetch updated data after deletion
        console.warn("Response", res);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }
  const fetchData = () => {
    fetch("http://localhost:8000/tabledata")
      .then((response) => response.json())
      .then((data) => setItems(data));
    console.log(items);
  };

  const openform = () => {
    navigate("/UpdateForm");
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },

    {
      title: "Delete",
      dataIndex: "",
      key: "x",
      render: (items, i) => (
        <Button onClick={() => handleDelete(items)}>Delete</Button>
      ),
    },
    {
      title: "Update",
      dataIndex: "",
      key: "x",
      render: () => <Button onClick={() => openform()}>Update</Button>,
    },
  ];
  return <Table columns={columns} dataSource={items} />;
};
export default TableData;
