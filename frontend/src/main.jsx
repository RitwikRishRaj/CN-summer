import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Create root
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
