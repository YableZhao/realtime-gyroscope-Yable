import React from 'react';
import ReactDOM from 'react-dom/client';

import { LayoutOverview } from "@root/layout"

import { ws } from "@root/ws"

const root = ReactDOM.createRoot(document.getElementById('overview-root'));
root.render(
    <React.StrictMode>
        <LayoutOverview/>
    </React.StrictMode>
);

void ws;