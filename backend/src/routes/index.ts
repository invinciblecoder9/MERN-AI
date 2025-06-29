import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

// if the request is domain/api/v1/user  then userRoutes wil handle it 
appRouter.use("/user", userRoutes);
appRouter.use("/chat", chatRoutes);

export default appRouter;