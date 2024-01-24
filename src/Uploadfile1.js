import React, { useState } from "react";
import { Button, Form, Input, Upload } from "antd";
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
    formData.append("name", values?.name);
    formData.append("email", values?.email);

    let FileListing = values?.file?.fileList;
    FileListing.forEach((file) => {
      formData.append("file", file.originFileObj);
      console.log("the files", file);
    });
    console.log("this is our formdata", values);
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

  return (
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
  );
};

export default Uploadfile1;
