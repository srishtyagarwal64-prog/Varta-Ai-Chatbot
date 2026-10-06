import "dotenv/config";
import Groq from "groq-sdk";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.error("GROQ_API_KEY is not set in environment variables");
  process.exit(1);
}

const groq = new Groq({
  apiKey: groqApiKey
});

export default groq;