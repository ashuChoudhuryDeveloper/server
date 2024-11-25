const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Myai = new GoogleGenerativeAI("AIzaSyCC162T89VWSz4mCTsGPaPBClBUQ_QnHBI");
let model = Myai.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat();

async function sendMessage(text) {
    const AI = await chat.sendMessage(text);
    return AI.response.text();
}

router.get("/", async (req, res) => {
    const { message, name, description } = req.query; // Changed from req.params to req.query

    if (!message || !name || !description) { // Fixed condition to ensure all fields are present
        res.status(400).json({
            error: true,
            message: "Required fields are missing. Please provide `message`, `name`, and `description`.",
        });
        return;
    }

    try {
        chat.systemInstruction = `
            name: ${name},
            description: ${description}
        `; // Assignment statement doesn't need await

        const text = await sendMessage(message); // Use async/await for clarity
        res.status(200).json({
            error: false,
            message: text,
        });
    } catch (e) {
        console.error("Error in processing:", e);
        res.status(500).json({
            error: true,
            message: "An internal error occurred. Please try again later.",
        });
    }
});

module.exports = router;
