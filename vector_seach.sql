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
    id,
    content,
    1 - (embedding <-> query_embedding) as similarity
  from documents
  order by embedding <-> query_embedding
  limit match_count;
end;
$$;