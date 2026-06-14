-- Create the todos table
CREATE TABLE public.todos (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
-- 1. Allow public read access (so the test page can query without auth)
CREATE POLICY "Allow public read access" ON public.todos 
FOR SELECT 
USING (true);

-- 2. Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON public.todos 
FOR INSERT TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.todos 
FOR UPDATE TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete" ON public.todos 
FOR DELETE TO authenticated 
USING (true);

-- Insert some dummy data for the test page
INSERT INTO public.todos (name) VALUES 
  ('Explore the new Supabase database'),
  ('Learn about Row Level Security'),
  ('Build an amazing Next.js app');
