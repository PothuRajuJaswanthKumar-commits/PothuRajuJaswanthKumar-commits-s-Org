
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sseqxebo9bcl1cvznymr.supabase.co'; // Derived from key pattern
const supabaseAnonKey = 'sb_publishable_SseqXEbo9BCL1CvZnyMRvQ_mpaEklMo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
