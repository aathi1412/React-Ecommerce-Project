import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';



export function OrdersGrid({ orders, loadCart }) {
    return (
        <div className="orders-grid">
            {orders.length > 0 && orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">

                        <OrderHeader order={order} />

                        <OrderDetailsGrid loadCart={loadCart} order={order} />
                    </div>
                );
            })}
        </div>
    );
}