import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root');

if (!root) {
    throw new Error("CRITICAL: Root element not found. Check index.html for <div id='root'></div>");
}

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
