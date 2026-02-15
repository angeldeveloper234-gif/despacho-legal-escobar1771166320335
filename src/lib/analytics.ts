import { supabase } from "./supabase";
import { getTrafficSource } from "./traffic";

export const getVisitorId = () => {
    let vid = localStorage.getItem("visitor_id");
    if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem("visitor_id", vid);
    }
    return vid;
};

export async function trackEvent(eventName: string, metadata: any = {}, clientId: string = 'unknown') {
    try {
        // Automatically enrich metadata with traffic source information
        const enrichedMetadata = {
            ...metadata,
            source: metadata.source || getTrafficSource(),
            referrer: metadata.referrer || document.referrer || 'none'
        };

        const { error } = await supabase.from('analytics_events').insert({
            event_type: eventName,
            visitor_id: getVisitorId(),
            page_path: window.location.pathname,
            metadata: enrichedMetadata,
            client_id: clientId
        });

        if (error) console.error("Error tracking event:", error);
    } catch (e) {
        console.error("Analytics Error:", e);
    }
}

