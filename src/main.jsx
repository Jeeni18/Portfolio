import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './pressFeedback'

// The site has one (dark) design. Clear the theme choice an earlier
// version saved, so a visitor who picked light mode doesn't keep the key.
try { window.localStorage.removeItem('jeeni-theme') } catch { /* private mode */ }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
