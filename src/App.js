import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/Product Listing Page/ProductList';
import ProductDetails from './Components/Product Details Page/ProductDetails';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<ErrorBoundary error="Page Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
