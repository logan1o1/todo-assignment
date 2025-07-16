import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import connectDB from "./backend/db/db.js";
import userRouter from "./backend/routes/auth.route.js";
import taskRouter from "./backend/routes/tasks.route.js";
import cookieParser from "cookie-parser";


const __dirname = path.resolve()

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 4000

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get(/^(?!\/api\/).*/, (req, resp) => {
    resp.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

const server = app.listen(PORT, () => {
    connectDB()
    console.log("app running on:", PORT)
});

server.on("error", (err) => {
    console.error("Server error:", err);
});


app.use((err, req, resp, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message  || "Internal Server Error"
    return resp.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})