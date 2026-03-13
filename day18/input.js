import { ChatMistralAI } from "@langchain/mistralai"
import readline from "readline/promises"
import { HumanMessage } from "langchain"
import dotenv from "dotenv"

dotenv.config()

const model = new ChatMistralAI({
  model: "mistral-small-latest",
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

async function main() {
  const userInputs = []
  while (true) {
    const userInput = await rl.question(
      "Ask the AI anything (or type 'exit' to quit): ",
    )
    if (userInput.trim().toLowerCase() === "exit") break
    userInputs.push(new HumanMessage(userInput))
    try {
      const response = await model.invoke(userInputs)
      console.log("AI Response:", response.content)
    } catch (err) {
      console.error("Error from AI:", err)
    }
  }
  rl.close()
}

main()
