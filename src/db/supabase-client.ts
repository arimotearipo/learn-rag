import path from "node:path"
import { createClient } from "@supabase/supabase-js"
import { Client } from "pg"

const client = new Client({
	connectionString: process.env.SUPABASE_DB_URL,
})

await client.connect()

const scriptsDir = path.join(process.cwd(), "src", "db", "scripts")

const enablePgVector = await Bun.file(
	path.join(scriptsDir, "enable_pgvector.sql"),
).text()
await client.query(enablePgVector)

const createDocumentsTable = await Bun.file(
	path.join(scriptsDir, "create_documents_table.sql"),
).text()
await client.query(createDocumentsTable)

const vectorSearchSql = await Bun.file(
	path.join(scriptsDir, "vector_search.sql"),
).text()
await client.query(vectorSearchSql)

await client.end()

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log("Supabase client initialized")
