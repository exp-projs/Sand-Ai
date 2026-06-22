-- Create website_scans table to track scans per user
CREATE TABLE IF NOT EXISTS public.website_scans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.website_scans ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own scans
CREATE POLICY "Allow authenticated users to insert scans" ON public.website_scans
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own scans
CREATE POLICY "Allow users to read own scans" ON public.website_scans
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
