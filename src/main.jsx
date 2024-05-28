import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// importación de fuentes
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// importación material ui
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// constante para declarar dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
  </ThemeProvider>
)
