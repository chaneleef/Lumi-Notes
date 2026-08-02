import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "9999px",
            background: "#fff",
            color: "#4b5563",
            fontFamily: "Fredoka, sans-serif",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(244, 114, 182, 0.25)",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
