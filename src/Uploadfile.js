import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, message, Upload, Form, Input, Row, Col } from "antd";

const Uploadfile = () => {
  const [fileList, setFileList] = useState([]);

  //   const handleUpload = async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("image", doc);
  //       console.warn("CHECK", formData);
  //       await axios.post("http://localhost:8000/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Image upload success");
  //     } catch (error) {
  //       console.log("There is error to upload a image", error);
  //     }
  //   };

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

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => {
        console.info(res);
        window.location.reload();
      })
      .catch(() => {
        console.info("upload failed.");
      })
      .finally(() => {});
  };

  return (
    <>
      <div>
        <Form name="file upload">
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
          <Form.Item>
            <Button onClick={handleUpload}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Uploadfile;
