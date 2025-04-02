import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://orykinnxvsnuvcqrfokl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yeWtpbm54dnNudXZjcXJmb2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTMxMzcxOSwiZXhwIjoyMDU0ODg5NzE5fQ.Vy-B-4ptZRGcwJvue_r5JgwL0cJGtqfK2HFnvCNjrUE' 

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
