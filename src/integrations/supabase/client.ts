// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bxaqdjoatqanrcgbgxxn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YXFkam9hdHFhbnJjZ2JneHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODU4NjUsImV4cCI6MjA1OTY2MTg2NX0.AfIEfnrjojAQ0OsAarukyhbaTxSj7iB20aOPrOB1AiE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);