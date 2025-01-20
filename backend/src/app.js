import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));    

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import templateRouter from "./routes/template.routes.js";
import chatRouter from "./routes/chat.routes.js";

//routes declaration
app.use("/api/v1/users", templateRouter);
app.use("/api/v2/users", chatRouter);
export {app}