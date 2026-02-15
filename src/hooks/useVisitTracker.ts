import { useEffect, useRef } from 'react';
import { config } from '../config';
import { trackEvent } from '@/lib/analytics';
import { getTrafficSource } from '@/lib/traffic';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export const useVisitTracker = () => {
    // Use a ref to ensure we only run this logic once per mount, even in StrictMode
    const hasRun = useRef(false);

    useEffect(() => {
        if (!config.analytics.enabled || hasRun.current) return;
        hasRun.current = true;

        const logVisit = async () => {
            try {
                // 1. Identify Visitor (Persistent)
                let visitorId = localStorage.getItem('visitor_id');
                if (!visitorId) {
                    visitorId = window.crypto.randomUUID();
                    localStorage.setItem('visitor_id', visitorId);
                }

                // 2. Session Management (Time-based, like GA)
                const now = Date.now();
                const lastActivity = localStorage.getItem('last_activity');
                const lastSessionId = localStorage.getItem('current_session_id');
                
                let sessionId = lastSessionId;
                let isNewSession = false;

                // Check if session expired or doesn't exist
                if (!lastActivity || !lastSessionId || (now - parseInt(lastActivity)) > SESSION_TIMEOUT_MS) {
                    isNewSession = true;
                    sessionId = window.crypto.randomUUID();
                    localStorage.setItem('current_session_id', sessionId);
                }

                // Update activity timestamp
                localStorage.setItem('last_activity', now.toString());

                // 3. Log Session Start ONLY if it's a new session
                if (isNewSession) {
                    const trafficSource = getTrafficSource();
                    
                    const payload = {
                        event: 'session_start',
                        visitorId,
                        sessionId,
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        userAgent: navigator.userAgent,
                        user: config.demoUser,
                        metadata: {
                            source: trafficSource,
                            referrer: document.referrer || 'none'
                        }
                    };

                    console.log('📊 Analytics: New Session Started', payload);

                    // Send to Webhook
                    if (config.analytics.webhookUrl) {
                        fetch(config.analytics.webhookUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        }).catch(e => console.error("Webhook error", e));
                    }

                    // Send to Supabase
                    // We pass config.landingClientId to separate data by client
                    trackEvent(
                        'session_start', 
                        {
                            sessionId,
                            userAgent: navigator.userAgent,
                            demoUser: config.demoUser,
                            source: trafficSource,
                            referrer: document.referrer || 'none'
                        },
                        config.landingClientId // <--- Pass the Client ID here
                    );
                } else {
                    console.log('📊 Analytics: Active session continues (no new session_start event).');
                }

            } catch (error) {
                console.error('📊 Analytics Error:', error);
            }
        };

        logVisit();
    }, []);
};
