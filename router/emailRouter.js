import express from "express";
import { sendEmailToClients } from "../utility/nodeMailerHelper.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const emailRouter = express.Router();

emailRouter.post("/", async (req, res) => {
  try {
    const { emails } = req.body;
    const success = await sendEmailToClients(emails);
    success
      ? buildSuccessResponse(res, success, "Emails sent successfully")
      : buildErrorResponse(res, "Cannot Send Email");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

export default emailRouter;
