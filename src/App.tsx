import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { AppContainer } from './layout/AppStyles';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { SearchPage } from './pages/SearchPage';
import { CartProvider } from './context/CartContext'; 
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { EditProductPage } from './pages/EditProductPage';

export function App() {
  return (
    <CartProvider>
      <Router>
        <AppContainer>
          <GlobalStyle />
          <Header />
          <main>
            <Routes>
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin/products" element={<PrivateRoute><AdminProductsPage/></PrivateRoute>} />
              <Route path="/admin/products/edit/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
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
