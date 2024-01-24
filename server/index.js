const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const UserSchema = require("./Models/usedata");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/", {
  dbName: "userdatabase",
});

const User = mongoose.model("users", UserSchema);

User.createIndexes();

app.post("/register", async (req, resp) => {
  try {
    console.log("sdfsdf", req.body);
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    console.warn("sdfsdf", result);
  } catch (e) {
    if (e.code === 11000) {
      resp.send("Duplicate record found");
    } else {
      resp.send("Something Went Wrong");
    }
  }
});

app.post("/login", async (req, res) => {
  const formdata = req.body;
  const formregister = await User.findOne({ name: formdata.name });
  if (formregister) {
    console.log("user alreay register");
  }
  res.status(200).send("already register");
});
//get the data into the table format
app.get("/tabledata", async (req, res) => {
  const data = await User.find();
  const tab = res.json(data);
  console.log("data shown", tab);
});

//delete api
app.post("/deleteRecord", async (req, res) => {
  try {
    var EmailId = req.body.email;
    if (EmailId) {
      let deleteRecord = await User.deleteOne({ email: EmailId });
      res.status(200).send("Record Deleted successfully");
    }
  } catch (err) {
    console.error(err);
  }
});

//update api
app.post("/Update", async (req, res) => {
  const Email = req.body.email;

  const jsonConvert = { email: Email };
  const updateDate = await User.updateOne({ $set: jsonConvert });
  console.log(updateDate);

  res.status(200).send(updateDate);
});

//upload api

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    console.log("suucessfully added");
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newImage = new User({
      name: req.body.name,
      email: req.body.email,
      filename: req.file.filename,
      path: req.file.path,
    });
    
    await User.collection.insertOne(newImage);
    // await newImage.save();
    res.status(200).json({ message: "Image successfully uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//port number

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
