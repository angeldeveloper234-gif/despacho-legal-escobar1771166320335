/**
 * Utility to detect the traffic source of the visitor.
 * Implements a hierarchy: UTM Parameters > Document Referrer > Direct Traffic.
 */
export const getTrafficSource = (): string => {
    try {
        // 1. High Priority: UTM Parameters (Query Strings)
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');

        if (utmSource) {
            // Normalization: lowercase and trim
            return utmSource.toLowerCase().trim();
        }

        // 2. Medium Priority: Document Referrer
        const referrer = document.referrer;
        if (referrer) {
            const lowerReferrer = referrer.toLowerCase();
            
            // Categorization logic
            if (lowerReferrer.includes('google')) return 'google_organic';
            if (lowerReferrer.includes('facebook') || lowerReferrer.includes('fb.com')) return 'facebook';
            if (lowerReferrer.includes('linkedin')) return 'linkedin';
            if (lowerReferrer.includes('instagram')) return 'instagram';
            if (lowerReferrer.includes('twitter') || lowerReferrer.includes('t.co')) return 'twitter';
            if (lowerReferrer.includes('whatsapp')) return 'whatsapp';
            
            // Fallback to hostname if it's an external domain
            try {
                const url = new URL(referrer);
                const hostname = url.hostname.toLowerCase().replace('www.', '');
                // If it's the same domain, don't count as external referrer
                if (hostname === window.location.hostname.toLowerCase().replace('www.', '')) {
                    return 'direct';
                }
                return hostname;
            } catch {
                return 'external_referrer';
            }
        }

        // 3. Low Priority: Direct Traffic
        return 'direct';
    } catch (error) {
        console.error('Error detecting traffic source:', error);
        return 'detection_error';
    }
};
