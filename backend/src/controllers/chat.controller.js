import { basePrompt as nodeBasePrompt } from "../defaults/node.js";
import { BASE_PROMPT, getSystemPrompt } from "../defaults/systemPrompts.js";
import { basePrompt as reactBasePrompt } from "../defaults/react.js";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatController = async (req, res) => {
    const messages = req.body.messages;

    try {
        // Make the request to OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Replace with the correct model if needed
            messages: [
                { role: "system", content: getSystemPrompt() }, ...messages
            ],
            max_tokens: 8000,
        });

        // Log the full response for debugging
        console.log(response);

        // Extract the content from the response
        const answer = response.choices[0]?.message?.content;
        console.log(answer);
        if (answer) {
            // Send the extracted content as the response
            res.json({ answer });
        } else {
            // If there's no valid content, return an error
            res.status(500).json({ message: "No content returned from OpenAI" });
        }
    } catch (error) {
        console.error("Error with OpenAI API:", error.message);
        res.status(500).json({ message: "Something went wrong." });
    }
};

export default chatController;
