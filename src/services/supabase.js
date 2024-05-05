import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://guosasbscjhljuzjjycc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b3Nhc2JzY2pobGp1empqeWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NzIwMTQsImV4cCI6MjAxOTA0ODAxNH0.uWieAW4_sKYzO90HdlkoFoflHShNHpOedzrs1e18ZqI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
