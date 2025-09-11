import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { WalletContextProvider } from './contexts/WalletContextProvider';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders the App component without crashing', () => {
    render(
      <Provider store={store}>
        <WalletContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WalletContextProvider>
      </Provider>
    );

    // Footer bileşeninin içeriğinden bir metin arayarak render edilip edilmediğini kontrol edebiliriz.
    // Örneğin, Footer'da "Blokaid © 2024" yazıyorsa:
    expect(screen.getByText(/Blokaid/i)).toBeInTheDocument();
  });
});