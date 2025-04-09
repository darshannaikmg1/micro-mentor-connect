
-- Function to get saved mentors for a user
CREATE OR REPLACE FUNCTION public.get_saved_mentors(user_id_param UUID)
RETURNS TABLE (
  mentor_id TEXT
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT mentor_id
  FROM public.saved_mentors
  WHERE user_id = user_id_param;
$$;

-- Function to save a mentor for a user
CREATE OR REPLACE FUNCTION public.save_mentor(
  user_id_param UUID,
  mentor_id_param TEXT,
  saved_at_param TIMESTAMP WITH TIME ZONE DEFAULT now()
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.saved_mentors (user_id, mentor_id, saved_at)
  VALUES (user_id_param, mentor_id_param, saved_at_param)
  ON CONFLICT (user_id, mentor_id) DO NOTHING;
END;
$$;

-- Function to unsave a mentor for a user
CREATE OR REPLACE FUNCTION public.unsave_mentor(
  user_id_param UUID,
  mentor_id_param TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.saved_mentors
  WHERE user_id = user_id_param AND mentor_id = mentor_id_param;
END;
$$;
