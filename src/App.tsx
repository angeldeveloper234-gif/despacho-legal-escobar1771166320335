import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Feedback } from "./pages/Feedback";
import { UserProvider, useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { useVisitTracker } from "@/hooks/useVisitTracker";

import { MobileConversionBar } from "@/components/ui/MobileConversionBar";

function AnalyticsTracker() {
    const location = useLocation();
    const { clientId } = useUser();

    // Initialize global analytics (visit tracking)
    useVisitTracker();

    // Only track page_view if it's NOT the initial load (handled by session_start usually)
    // OR if we want to track every navigation.
    // To reduce noise as requested, we can disable this or make it smarter.
    // For a single-page landing, 'session_start' is usually enough.
    // But if they navigate, we might want to know.
    // Given the user complaint about "duplicates", let's comment this out for now
    // and rely ONLY on session_start for the "Visit" count.

    /* 
    useEffect(() => {
        trackEvent("page_view", { path: location.pathname }, clientId);
    }, [location, clientId]);
    */

    return null;
}

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="relative">
                    <AnalyticsTracker />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/feedback" element={<Feedback />} />
                    </Routes>
                    <MobileConversionBar />
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
