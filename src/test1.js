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
