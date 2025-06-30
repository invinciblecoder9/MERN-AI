import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import {Toaster} from 'react-hot-toast'
import axios from "axios";


axios.defaults.baseURL = "https://mern-ai-wsq6.onrender.com/api/v1";
// it will help to exchange cookies
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography:{
    fontFamily:"Roboto Slab, serif", 
    allVariants: {color: "white"},
 },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right' />
            <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
