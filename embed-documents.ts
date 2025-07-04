import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { embedAndStoreDocument } from "./src/rag/embedding"

async function main() {
	const folderPath = "./sample_documents"
	const files = await readdir(folderPath)

	const embedAndStoreDocumentPromises = []

	for (const file of files) {
		const filePath = path.join(folderPath, file)
		const content = await readFile(filePath, "utf-8")

		console.log(`Embedding ${file}`)
		embedAndStoreDocumentPromises.push(embedAndStoreDocument(content))
	}

	await Promise.all(embedAndStoreDocumentPromises)
}

main()
