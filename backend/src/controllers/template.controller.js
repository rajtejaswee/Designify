import { basePrompt as nodeBasePrompt } from "../defaults/node.js";
import { BASE_PROMPT } from "../defaults/systemPrompts.js";
import { basePrompt as reactBasePrompt } from "../defaults/react.js";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const templateController = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Return either 'node' or 'react' based on what you think this project should be. Only return a single word: 'node' or 'react'. Do not return anything extra.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });
    // console.log("OpenAI Response:", response);
    const message = response.choices[0]?.message;
    // console.log("Message:", message);
    const answer = response.choices[0]?.message?.content.trim();
    if (!["react", "node"].includes(answer)) {
      return res.status(400).json({ message: "Invalid response from AI." });
    }
    if (answer === "react") {
      return res.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      });
    }

    if (answer === "node") {
      return res.json({
        prompts: [
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodeBasePrompt],
      });
    }
    res.status(403).json({ message: "You can't access this" });
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default templateController;
