require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const { mongoose } = require("mongoose");
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());

app.use(express.json());

// app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));

app.all("*", (req, res) => {
  res.json({ message: "404 Not Found" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
