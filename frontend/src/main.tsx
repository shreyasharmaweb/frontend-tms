import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import 'rsuite/dist/rsuite.min.css'
import { CustomProvider } from 'rsuite'
import Approutes from './routes.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <CustomProvider>
        <Approutes/>
    </CustomProvider>
    // {/* <App /> */}
  // </React.StrictMode>,
)


