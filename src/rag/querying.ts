import { supabase } from "../db/supabase-client"
import { openai } from "../openai/openai-client"

export async function querySimilarDocuments(query: string, topK = 3) {
	const response = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: query,
	})

	const queryEmbedding = response.data[0]?.embedding

	const { data, error } = await supabase.rpc("match_documents", {
		query_embedding: queryEmbedding,
		match_count: topK,
	})

	if (error) {
		console.error("Error querying documents: ", error)
		return []
	}

	return data
}
