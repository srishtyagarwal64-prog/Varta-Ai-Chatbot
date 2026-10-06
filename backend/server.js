import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import visitorRoute from "./module/visitor/visitorroutes.js";
import conversationRoute from "./module/conversation/conversationroutes.js";
import messageRoute from "./module/message/messageroutes.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        frameguard: false,
    })
);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests from this IP, please try again later.",
    },
});

app.use("/api/", apiLimiter);

app.get("/", (req, res) => {
    res.send("Api is working");
});

// Routes
app.use("/",visitorRoute);
app.use("/", conversationRoute);
app.use("/", messageRoute);

app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
});