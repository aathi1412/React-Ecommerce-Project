import { Header } from '../../components/Header';
// import { OrderTracking } from './OrderTracking';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import './TrackingPage.css';
import { useState, useEffect } from 'react';

export function TrackingPage({ cart }) {
    const [order, setOrder] = useState(null);
    const { orderId, productId } = useParams();

    useEffect(() => {
        const getTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };
        getTrackingData();

    }, [orderId]);

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return productId === orderProduct.productId;
    });

    const today = dayjs().valueOf();
    const orderTime = order.orderTimeMs;
    const deliveryTime = orderProduct.estimatedDeliveryTimeMs;
    
    const progressPercent = ((today - orderTime) / (deliveryTime - orderTime)) *100;

    return (
        <>
            <title>Tracking</title>

            <link rel="icon" type="image/png" to="/tracking-favicon.png" />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {progressPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${progressPercent < 50 ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${progressPercent > 50 && progressPercent < 100 ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${progressPercent > 100 ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${progressPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}