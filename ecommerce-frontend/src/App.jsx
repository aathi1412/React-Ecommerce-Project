import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage'
import './App.css'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { Error } from './pages/Error';
import { useState, useEffect } from 'react';
import axios from 'axios';

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('api/cart-items?expand=product')

    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);
  

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<Error cart={cart} />} />
    </Routes>
  )
}

export default App