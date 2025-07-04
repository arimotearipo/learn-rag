import { supabase } from "../db/supabase-client"
import { openai } from "../openai/openai-client"

export async function embedAndStoreDocument(content: string) {
	const response = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: content,
	})

	const embedding = response.data[0]?.embedding

	const { error } = await supabase.from("documents").insert([
		{
			content,
			embedding,
		},
	])

	if (error) {
		console.error("Error inserting document: ", error)
	} else {
		console.log("Document inserted!")
	}
}
