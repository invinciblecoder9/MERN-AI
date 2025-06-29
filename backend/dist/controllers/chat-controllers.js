// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureGemini } from "../config/gemini-config.js";
import User from "../models/User.js";
import { configureGemini } from "../config/gemini-config.js";
// Utility to map DB roles to Gemini roles
function mapRoleForGemini(role) {
    if (role === "assistant")
        return "model";
    return "user";
}
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        // Add user message to chats
        user.chats.push({ content: message, role: "user" });
        // Prepare chat history for Gemini
        const history = user.chats.map((chat) => ({
            role: mapRoleForGemini(chat.role),
            parts: [{ text: chat.content }],
        }));
        // Initialize Gemini
        const genAI = configureGemini();
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        // Start a chat session
        const chat = model.startChat({ history });
        // Send the latest message and get response
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        // Add model/assistant response to chats (store as "assistant" in DB)
        user.chats.push({ content: text, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions didn't match" });
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions didn't match" });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map