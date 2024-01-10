import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wtmftqytixnpkawskhgg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bWZ0cXl0aXhucGthd3NraGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMzk4MTgsImV4cCI6MjAxOTYxNTgxOH0.WAUS3CG4deJGlZbY5JNDJYSlcbUsT1bYMlmnyhTWvps"
);
