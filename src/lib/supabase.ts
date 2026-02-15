
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

// Safe client creation to prevent White Screen of Death
const createSafeClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('⚠️ Supabase credentials missing. App running in offline/demo mode.');
        // Return a dummy client or a valid client with empty url (which might throw on use, but not on init)
        // Better to return undefined or handle usage checks, but for now we'll return a proxy that logs warnings
        // OR just create a client with dummy values to prevent instant crash
        return createClient('https://placeholder.supabase.co', 'placeholder');
    }
    return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSafeClient();
