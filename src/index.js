import React from 'react'
import ReactDOM from 'react-dom'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import App from './views/App'

window.CONFIG = __CONFIG__

ReactDOM.render(<App />, document.getElementById('root'))
