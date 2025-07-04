import { createClient } from "@supabase/supabase-js"
import { OpenAI } from "openai"

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

console.log("Supabase client initialized")

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function embedAndStoreDocument(content: string) {
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

async function querySimilarDocuments(query: string, topK = 3) {
	const response = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: query,
	})

	const queryEmbedding = response.data[0]?.embedding

	const { data, error } = await supabase.rpc("match_ducments", {
		queryEmbedding: queryEmbedding,
		match_count: topK,
	})

	if (error) {
		console.error("Error querying documents: ", error)
		return []
	}

	return data
}
