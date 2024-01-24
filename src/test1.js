// const express = require("express");
// const cors = require("cors");
// const app = express();

// const UserSchema=require("./Models/usedata")
// app.use(cors());
// app.use(express.json());

// const mongoose=require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/", {
//   dbName: "WebsiteDatabase",
// });

// const User = mongoose.model("login",UserSchema);
// User.createIndexes();

// // api to get the data from user
// app.post("/register",async(req,res)=>{
//   try {
   
//     console.log("sdfsdf", req.body);
//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     console.warn("sdfsdf", result);
//   } catch (error) {
//     res.send("there is error")
//   }
// })

// // API to update user data by ID
// app.put("/update/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updateData = req.body;

//     const result = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
     
//     });
//     console.log(result)
//     if (!result) {
//       return res.status(404).send("User not found");
//     }

//     res.send(result);
//   } catch (error) {
//     res.status(500).send("There is an error");
//   }
// });


// app.listen(8000, () => {
//   console.log(Server is running on port 8000.);
// });
import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import axios from 'axios';

const Test = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState('');

  const onFinish = async (values) => {
    try {
      const response = await axios.put("http://localhost:8000/update/${userId}", values);
      console.log('Update response:', response.data);
      console.log(response,"this is your response")
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    console.log(setUserId,"my id")
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="User ID"
          name="userId"
          rules={[
            {
              required: true,
              message: 'Please input the user ID!',
            },
          ]}
        >
          <Input onChange={handleUserIdChange} />
        </Form.Item>

        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Test;
