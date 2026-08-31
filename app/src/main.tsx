import './index.css'

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import App from './app'

const element = document.getElementById('root') as HTMLElement

createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>
)
