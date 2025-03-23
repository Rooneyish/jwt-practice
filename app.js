import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import connectDB from "./databases/mongodb.js";
import 'dotenv/config';
const app = express();

const port = 7000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Node js course!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
   await connectDB();
});