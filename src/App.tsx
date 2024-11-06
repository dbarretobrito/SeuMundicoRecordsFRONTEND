import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { motion } from 'framer-motion';
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
import { CreateProductPage } from './pages/CreateProductPage';
import { NationalShirts } from '../src/pages/NationalShirts';
import { InternationalShirts } from '../src/pages/InternationalShirts';
import { ContactPage } from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

export function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <CartProvider>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AppContainer>
            <GlobalStyle />
            <Header />
            <main>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/admin/login" element={<PageTransition><LoginPage /></PageTransition>} />
                  <Route path="/admin/products" element={<PrivateRoute><PageTransition><AdminProductsPage /></PageTransition></PrivateRoute>} />
                  <Route path="/admin/products/create" element={<PrivateRoute><PageTransition><CreateProductPage /></PageTransition></PrivateRoute>} />
                  <Route path="/admin/products/edit/:id" element={<PrivateRoute><PageTransition><EditProductPage /></PageTransition></PrivateRoute>} />
                  <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
                  <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                  <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
                  <Route path="/national-shirts" element={<NationalShirts />} />
                  <Route path="/international-shirts" element={<InternationalShirts />} />
                  <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </main>
          </AppContainer>
        </motion.div>
      </CartProvider>
    </AuthProvider>
  );
}
