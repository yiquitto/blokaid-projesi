import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App.tsx';
import './App.css';
import WalletContextProvider from './contexts/WalletContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletContextProvider>
  </React.StrictMode>,
);
