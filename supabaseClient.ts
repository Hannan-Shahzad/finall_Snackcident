import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and public API key
const SUPABASE_URL = 'https://rmqvmbwqqvzagcaeqlak.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcXZtYndxcXZ6YWdjYWVxbGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMjc5MzYsImV4cCI6MjA0OTkwMzkzNn0.kWQu7qt8eihwP9p0noEnRKR2Sv1Ps8cnQKPYucIcIAw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
