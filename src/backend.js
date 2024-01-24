const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define MongoDB schema and model
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});
const Image = mongoose.model("Image", imageSchema);
// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
// API endpoint for handling image uploads
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
    });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
