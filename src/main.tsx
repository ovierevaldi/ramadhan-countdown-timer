import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App targetDate={new Date('Maret 1, 2025 04:40:00')}/>
  </StrictMode>,
)
