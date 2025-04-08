
-- Create a saved_mentors table to store saved mentors
CREATE TABLE IF NOT EXISTS public.saved_mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mentor_id TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, mentor_id)
);

-- Create RLS policies for saved_mentors
ALTER TABLE public.saved_mentors ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saved mentors
CREATE POLICY "Users can view their own saved mentors" ON public.saved_mentors
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only add to their own saved mentors list
CREATE POLICY "Users can add to their own saved mentors" ON public.saved_mentors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own saved mentors
CREATE POLICY "Users can delete their own saved mentors" ON public.saved_mentors
  FOR DELETE USING (auth.uid() = user_id);

-- Create sessions table to store mentoring sessions
CREATE TABLE IF NOT EXISTS public.mentoring_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_id UUID NOT NULL REFERENCES profiles(id),
  mentor_id TEXT NOT NULL,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  meeting_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies for mentoring_sessions
ALTER TABLE public.mentoring_sessions ENABLE ROW LEVEL SECURITY;

-- Users can see sessions they're involved in
CREATE POLICY "Users can view their own sessions" ON public.mentoring_sessions
  FOR SELECT USING (auth.uid() = mentee_id);

-- Mentees can create sessions
CREATE POLICY "Mentees can create sessions" ON public.mentoring_sessions
  FOR INSERT WITH CHECK (auth.uid() = mentee_id);

-- Users can update their own sessions
CREATE POLICY "Users can update their own sessions" ON public.mentoring_sessions
  FOR UPDATE USING (auth.uid() = mentee_id);

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'Profile Images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow users to upload their own avatars
CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = SPLIT_PART(name, '-', 1));

-- Create policy to allow anyone to view avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
