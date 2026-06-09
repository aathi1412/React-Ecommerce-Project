import dayjs from 'dayjs';
import { DeliveryOption } from './DeliveryOption';
import { CartItemDetails } from './CartItemDetails';



export function OrderSummary({ deliveryOptions, cart, loadCart }) {

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {

                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                });

                return (
                    <div key={cartItem.productId} className="cart-item-container">

                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">

                            <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                            <DeliveryOption deliveryOptions = {deliveryOptions} cartItem = {cartItem} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}