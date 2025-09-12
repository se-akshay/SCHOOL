const express = require("express");
const cors = require("cors");
const path = require("path");
const schoolsRoutes = require("./routes/schools");
const usersRouter = require("./routes/users");
const otpRouter = require("./routes/otp");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));

app.use("/users", usersRouter);
app.use("/schools", schoolsRoutes);
app.use("/auth", otpRouter);

app.get("/", (req, res) => {
  res.json({
    status: "API running",
    message: "Welcome to the School Management Backend!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
