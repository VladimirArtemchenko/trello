import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import Global from './styles/Global';
import reportWebVitals from './reportWebVitals';
import store, { persistor } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Global />
        <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>,
);
reportWebVitals();
