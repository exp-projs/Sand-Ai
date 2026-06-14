-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  service_type text not null,
  details text,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
-- 1. Allow authenticated users to insert a lead
CREATE POLICY "Allow authenticated insert" ON public.leads 
FOR INSERT TO authenticated 
WITH CHECK (true);

-- 2. Allow users to read their own leads
CREATE POLICY "Allow users to read own leads" ON public.leads 
FOR SELECT TO authenticated 
USING (auth.uid() = user_id);
