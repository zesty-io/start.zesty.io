import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createRoot } from 'react-dom/client'
import React from 'react'

import App from './views/App'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
