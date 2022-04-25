import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./views/App/App";
import {Normalize} from "styled-normalize";
import styled, {createGlobalStyle, GlobalStyleComponent} from "styled-components";
import reportWebVitals from './reportWebVitals';

const Global = createGlobalStyle`
    body {
      font: 16px/1.4 'Roboto', sans-serif;
      background: lightskyblue;
      min-height: 100vh;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
`
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Normalize/>
        <Global />
        <App />
    </React.StrictMode>
);
reportWebVitals();