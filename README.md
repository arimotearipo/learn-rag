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
- The `vectorpg` extension enabled in your Supabase Postgres database
- OpenAI API key (for embeddings and chat completions)

## Setting up Supabase with vectorpg
1. Go to your Supabase SQL editor.
2. Enable the `vectorpg` extension by running:

```sql
create extension if not exists vectorpg;
```

3. Create the `documents` table with an embedding column:

```sql
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  content text,
  embedding vector(1536)
);
```

4. Create the `match_documents` function for vector similarity search:

```sql
create or replace function match_documents(
  query_embedding vector(1536),
  match_count int default 3
)
returns table (
  id uuid,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <-> query_embedding) as similarity
  from documents
  order by documents.embedding <-> query_embedding
  limit match_count;
end;
$$;
```

- The `match_documents` function takes an embedding vector and returns the top N most similar documents based on vector distance.

## Embedding, Retrieval, and Chat Completion Models
- **Embedding Model:** [OpenAI `text-embedding-ada-002`](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings)
- **Retrieval Model:** The same OpenAI `text-embedding-ada-002` model is used to embed queries for retrieval, which are then matched in Postgres using the `vectorpg` extension and the `match_documents` function.
- **Chat Completion Model:** [OpenAI `gpt-3.5-turbo`](https://platform.openai.com/docs/models/gpt-3-5) is used to generate answers based on retrieved context and user questions.

## Embedding Sample Documents
Sample documents are provided in the `sample_documents` folder. To embed and store them in your database, run:

```sh
bun run embed-documents.ts
```

This script will read all files in `sample_documents`, generate embeddings using OpenAI, and store them in your Supabase Postgres database.

## Building and Running
1. Install dependencies:
   ```sh
   bun install
   ```
2. Set up your environment variables for Supabase and OpenAI as needed.
3. Run the embedding script as shown above.

## Required Environment Variables

Set the following environment variables in a `.env` file or your environment:

- `OPENAI_API_KEY` – Your OpenAI API key (for embeddings and chat completions)
- `SUPABASE_URL` – Your Supabase project URL
- `SUPABASE_KEY` – Your Supabase service role or anon key

Example `.env`:

```
OPENAI_API_KEY=your-openai-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
```