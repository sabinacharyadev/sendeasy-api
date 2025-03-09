import express from "express";
import cors from "cors";
import emailRouter from "./router/emailRouter.js";

const app = express();
const PORT = process.env.PROD || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/email", emailRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log("Server running successfully at http://localhost:" + PORT);
});
