import { openai } from "./src/openai/openai-client"
import { querySimilarDocuments } from "./src/rag/querying"

async function main() {
	const userQuestion = Bun.argv.at(-1)

	if (!userQuestion) {
		console.log("Please ask a question")
		return
	}

	const results = await querySimilarDocuments(userQuestion, 3)

	const context = results.map((doc: any) => doc.content).join("\n")

	const completion = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant. Use the provided context to answer the question.",
			},
			{
				role: "user",
				content: `Context:\n${context}\n\nQuestion: ${userQuestion}`,
			},
		],
	})

	console.log(`Question: ${userQuestion}`)
	console.log("Answer: ", completion.choices[0]?.message.content)
}

main()
