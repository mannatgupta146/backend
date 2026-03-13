import { ChatMistralAI } from "@langchain/mistralai"
import readline from "readline/promises"
import { HumanMessage, tool, createAgent } from "langchain"
import { sendEmail } from "./mail.service.js"
import dotenv from "dotenv"
import * as z from "zod"

dotenv.config()

const emailTool = tool(sendEmail, {
  name: "sendEmail",
  description: "Use this tool to send an email.",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    subject: z.string().describe("The subject of the email"),
    html: z.string().optional().describe("The HTML content of the email"),
  }),
})

const model = new ChatMistralAI({
  model: "mistral-small-latest",
})

const agent = createAgent({
  model,
  tools: [emailTool],
})


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

const messages = []

async function main() {
  const userInputs = []
  while (true) {
    const userInput = await rl.question(
      "Ask the AI anything (or type 'exit' to quit): ",
    )
    if (userInput.trim().toLowerCase() === "exit") break
    messages.push(new HumanMessage(userInput))
    try {
      const response = await agent.invoke({messages})
      messages.push(response.messages[response.messages.length - 1])

      console.log("AI Response:", response)
    } catch (err) {
      console.error("Error from AI:", err)
    }
  }
  rl.close()
}

main()
