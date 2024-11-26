import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';


import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.SITE_URL = "https://manibharathi.in/";
window.API_URL = "https://manibharathi.in/micapi/public/api/";
window.IMG_URL = "https://manibharathi.in/micapi/public/uploads/";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  
  <ConfigProvider>
    <App />
  </ConfigProvider>
  
);

reportWebVitals();
