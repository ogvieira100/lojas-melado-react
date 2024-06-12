import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import Loader from './components/loader.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
     <BrowserRouter>
    
        <App />
      </BrowserRouter>
     </Provider>
  </React.StrictMode>,
)
