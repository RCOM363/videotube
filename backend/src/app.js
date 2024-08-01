import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares

//enables cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //allowed to access to the server
    credentials: true, //allows credentails such as cookies to be sent
  })
);

//parses incoming req with json
app.use(express.json({ limit: "16kb" }));
//parses incoming req with url-encoding
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//serves static files from public dir
app.use(express.static("public"));
//parses cookies attached to the client req, gives cookies access
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);

export { app };
