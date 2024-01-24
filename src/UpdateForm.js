// import React, { useState, useEffect } from "react";
// import { Button, Form, Input } from "antd";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const UpdateForm = () => {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [userId, setUserId] = useState('');

//  //update the form api using put method

//   const onFinish = async (values) => {
//     const item = { email: values.email }
   

//     axios.post('http://localhost:8000/Update',item )
  
//     .then((res)=>{
//       console.log("Successfully updated user details");
//       navigate("/TableData");
//     })
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
 
//   const handleUserIdChange = (e) => {
//     setUserId(e.target.value);

//  }

//   return (
//     <div>
//       <Form
//         form={form}
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
        
//         {/* <Form.Item
//           label="name"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!",
//             },
//           ]}
//         >
//           <Input onChange={handleUserIdChange} />
//         </Form.Item> */}

//         <Form.Item
//           label="email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default UpdateForm;

import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, Upload, Form, Input, Table } from "antd";

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [productData, setProductData] = useState();

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.size <= 2000000) {
        setFileList([...fileList, file]);
        return false;
      } else {
        window.alert("Maximum upload size exceeded");
      }
    },
    fileList,
  };

  const handleUpload = (values) => {
    const formData = new FormData();
    formData.append("description", values?.description);
    formData.append("rating", values?.rating);

    let FileListing = values?.file?.fileList;
    FileListing.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => {
        window.location.reload();
      })
      .catch(() => {
        console.info("Upload failed.");
      })
      .finally(() => {});
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-products")
      .then((res) => {
        console.warn("Products", res);
        setProductData(res.data);
      })
      .catch(() => {
        console.info("Upload failed.");
      });
  }, []);

  const items = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Image",
      dataIndex: "filename",
      key: "filename",
      render: (item) => <div>{console.warn("TEST", item)}</div>,
    },
  ];

  return (
    <>
      <div className="mainWrapper">
        <Form name="file upload" onFinish={handleUpload}>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Rating" name="rating">
            <Input />
          </Form.Item>
          <Form.Item label="select file to upload" name="file">
            <Upload
              {...props}
              accept="image/png, image/jpeg"
              maxCount={1}
              name="imagefile"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>

      <div className="tableSection">
        <Table columns={items} dataSource={productData} />
      </div>
    </>
  );
};
export default App;