create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  content text,
  embedding vector(1536)
);