# Learn RAG

This project demonstrates a simple Retrieval-Augmented Generation (RAG) pipeline using Bun, OpenAI, and Supabase Postgres with the `vectorpg` extension enabled for vector search.

## Features
- Embeds and stores documents in a Postgres database with vector search capabilities
- Uses Supabase as the Postgres provider
- Includes a sample set of documents in the `sample_documents` folder
- Provides scripts to embed documents and perform vector search queries
- **Uses OpenAI's `text-embedding-ada-002` model for both embedding and retrieval**
- **Uses OpenAI's `gpt-3.5-turbo` model for chat completion**

## Prerequisites
- [Bun](https://bun.sh/) installed
- A Supabase project with Postgres
- OpenAI API key (for embeddings and chat completions)

## Supabase Setup (No Manual SQL Required)
You do **not** need to manually run any SQL scripts to set up your Supabase database. The necessary extensions, tables, and functions (including `vectorpg`, `documents`, and `match_documents`) will be created automatically by the project scripts when you run them for the first time.

If you want to review or customize the SQL, see the scripts in `src/db/scripts/`.

## Embedding, Retrieval, and Chat Completion Models
- **Embedding Model:** [OpenAI `text-embedding-ada-002`](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings)
- **Retrieval Model:** The same OpenAI `text-embedding-ada-002` model is used to embed queries for retrieval, which are then matched in Postgres using the `vectorpg` extension and the `match_documents` function.
- **Chat Completion Model:** [OpenAI `gpt-3.5-turbo`](https://platform.openai.com/docs/models/gpt-3-5) is used to generate answers based on retrieved context and user questions.

## Embedding Sample Documents
Sample documents are provided in the `sample_documents` folder. To embed and store them in your database, run:

```sh
bun run embed-documents.ts
```

This script will read all files in `sample_documents`, generate embeddings using OpenAI, and store them in your Supabase Postgres database. It will also ensure your database is set up correctly.

## Building and Running
1. Install dependencies:
   ```sh
   bun install
   ```
2. Set up your environment variables for Supabase and OpenAI as needed.
3. Run the embedding script as shown above.

## Required Environment Variables

Copy the provided `.env` file in the project root and update the values as needed. The following variables are required:

- `OPENAI_API_KEY` – Your OpenAI API key (required for embeddings and chat completions)
- `SUPABASE_URL` – Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- `SUPABASE_KEY` – Your Supabase service role or anon key (must have permissions to create tables and functions)
- `SUPABASE_DATABASE_PASSWORD` – Your Supabase database password (used for direct database access if needed)
- `SUPABASE_DB_URL` – Your full Supabase Postgres connection string (used for direct SQL access if needed)

Example `.env`:

```
OPENAI_API_KEY=your-openai-api-key
SUPABASE_DATABASE_PASSWORD=your-supabase-db-password
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-or-anon-key
SUPABASE_DB_URL=postgresql://postgres:your-db-password@db.your-project.supabase.co:5432/postgres
```

> **Note:** The service role key and database credentials are recommended for local development to allow automatic database setup. Do not expose your service role key or database password in client-side code or public repositories.

## Asking Questions

After embedding your documents, you can ask questions to the AI model using Bun. Pass your question as a command-line argument to the `index.ts` script:

```sh
bun run index.ts "Who are Jules and Vincent?"
```

Or, if you have a script alias (e.g., `ask`):

```sh
bun run ask "Who are Jules and Vincent?"
```

Example output:

```
Supabase client initialized
Question: Who are Jules and Vincent?
Answer:  Jules and Vincent are two characters in the film "Pulp Fiction." They are hitmen and partners in crime working for influential local gangster Marsellus Wallace. Throughout the movie, they are involved in various criminal activities and have their own storyline within the larger narrative structure of the film.
```

You can replace the question with anything relevant to your embedded documents.