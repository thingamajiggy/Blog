import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import multer from "multer";

dotenv.config();

const { PORT = 8080 } = process.env;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("here");
    cb(null, "../client/youtube2022/public/upload");
  },
  filename: function (req, file, cb) {
    console.log("here 2");
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
