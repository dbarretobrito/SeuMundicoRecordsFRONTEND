import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { AppContainer } from './layout/AppStyles';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { SearchPage } from './pages/SearchPage';
import { CartProvider } from './context/CartContext'; 

export function App() {
  return (
    <CartProvider>
      <Router>
        <AppContainer>
          <GlobalStyle />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </AppContainer>
      </Router>
    </CartProvider>
  );
}
