// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fxcbsmyzdyieammhdkpp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Y2JzbXl6ZHlpZWFtbWhka3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzYwOTgsImV4cCI6MjA1MDAxMjA5OH0.N6PDgy2FJVuvV7-hKSF2cdKxHUYdWJArTOljntdTrXU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);