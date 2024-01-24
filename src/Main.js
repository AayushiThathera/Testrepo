import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const Main = () => {
  const navigate = useNavigate();
  const Registerpage = () => {
    navigate("/Register");
  };
  const Loginpage = () => {
    navigate("/Login");
  };
  const FileUpload = () => {
    navigate("/Uploadfile");
  };
  const FileUpload1 = () => {
    navigate("/Uploadfile1");
  };
  return (
    <>
      <div style={{ padding: 20, marginLeft: 30 }}>
        <Button onClick={() => Registerpage()}>Register</Button>
        <Button onClick={() => Loginpage()} style={{ marginLeft: 20 }}>
          Login
        </Button>
        <Button onClick={() => FileUpload()} style={{ marginLeft: 20 }}>
          Upload FIle
        </Button>
        <Button onClick={() => FileUpload1()} style={{ marginLeft: 20 }}>
          Upload FIle1
        </Button>
        <Button style={{ marginLeft: 20 }}>Click Me</Button>
        <Button style={{ marginLeft: 20 }}>SuBMIT</Button>
      
      </div>
    </>
  );
};

export default Main;
