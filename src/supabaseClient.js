import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zuvtlasfaepjpjvuvtzp.supabase.co";
const supabaseAnonKey = "sb_publishable_XFO_qC5xMJ6XoizsHSmuGQ_U8ewvO4y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);