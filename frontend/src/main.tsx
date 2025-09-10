import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import WalletContextProvider from './providers/WalletContextProvider';
import store from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletContextProvider>
  </React.StrictMode>
);