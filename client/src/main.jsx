import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import authContext from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <authContent>
    <App />
  </authContent>,
)
