import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, Table } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";

const Uploadfile1 = () => {
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState();

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

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("description", values?.name);
    formData.append("rating", values?.email);

    let FileListing = values?.file?.fileList;

    FileListing.forEach((file) => {
      formData.append("file", file.originFileObj);
      console.warn("the files", file);
    });
    console.log("this is our formdata", values);
    console.log("our formdata", formData);
    axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => {
        window.location.reload();
      })
      .catch(() => {
        console.info("upload failed.");
      })
      .finally(() => {});

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
   useEffect(() => {
     axios.get("http://localhost:8000/get-products")
       .then((res) => {
         console.warn("Details", res);
        //  console.log("filename of the image",res.data.filename)
         setFormData(res.data)
        //  console.log(formData, "data")
         const found = formData.find(obj => { return obj.filename; })
        //  found = found.filename;
         console.log("the filename of the given file", found.filename)
         let namefile = found.filename;
         let image = `data:{image.img.contentType};base64,$(data.img.data.toString('base64'))`;

        //  console.log(res.)
       }).catch(() => {
         console.info("get failed");
     })
  
   }, [])
   

  const items = [
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "filename",
      dataIndex: "path",
      key: "filename",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/${record.path}`}
          alt={record.filename}
          style={{maxHeight:"100px",maxWidth:"100px"}}
        />
      )
    },
  ];

  return (
    <>
      <div>
        <Form
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
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="select file to upload" name="file">
            <Upload
              {...props}
              accept="image/png, image/jpeg"
              maxCount={1}
              name="file"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Table columns={items} dataSource={formData} />
      </div>
    </>
  );
};

export default Uploadfile1;
