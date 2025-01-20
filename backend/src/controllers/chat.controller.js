import { getSystemPrompt } from "../defaults/systemPrompts.js";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatController = async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: getSystemPrompt() }, ...messages],
      max_tokens: 8000,
    });
    console.log(response);
    const answer = response.choices[0]?.message?.content;
    console.log(answer);
    if (answer) {
      res.json({ answer });
    } else {
      res.status(500).json({ message: "No content returned from OpenAI" });
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default chatController;
