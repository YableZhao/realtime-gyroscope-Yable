import React from 'react';
import ReactDOM from 'react-dom/client';

import { Layout } from "@root/layout"

import { ws } from "@root/ws"

// const user = new User();

const root = ReactDOM.createRoot(document.getElementById('index-root'));
root.render(
  <React.StrictMode>
      <Layout/>
  </React.StrictMode>
);
