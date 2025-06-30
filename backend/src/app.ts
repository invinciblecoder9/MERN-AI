// all middlewares are defined here
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

config();
const app = express();

//middlewares
app.use(cors({origin: ["https://mern-ai-tn68.vercel.app/", "http://localhost:5173"], credentials: true, exposedHeaders: ["set-cookie"]}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter)

export default app;