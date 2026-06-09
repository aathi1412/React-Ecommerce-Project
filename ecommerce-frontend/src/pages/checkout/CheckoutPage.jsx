import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getcheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')

            setDeliveryOptions(response.data);
        };
        getcheckoutData();
    }, []);

    useEffect(() => {
        const fetchpaymentSummary = async () => {
            let response = await axios.get('/api/payment-summary')

            setPaymentSummary(response.data);
        };
        fetchpaymentSummary();
    }, [cart])

    window.axios = axios;
    // console.log(axios.post('/api/reset'));

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/png" to="/cart-favicon.png" />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary
                    deliveryOptions={deliveryOptions}
                    cart={cart} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    );
}