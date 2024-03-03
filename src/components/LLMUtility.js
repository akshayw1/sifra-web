import { OpenAI } from "openai";
class LLM {
    constructor(masterPrompt) {
        this.masterPrompt = masterPrompt;
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
        this.openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
    }

    async getRespose(prompt) {
        console.log("prompt", prompt);
        console.log(this.openai.chat.completions.create);
        const completion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: this.masterPrompt,
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            model: "gpt-3.5-turbo-1106",
            // response_format: { type: "json_object" },
        });

        return completion.choices[0].message.content;
    }
}

export default LLM;
