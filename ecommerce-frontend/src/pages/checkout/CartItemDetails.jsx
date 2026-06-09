import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';


export function CartItemDetails({ cartItem, loadCart }) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    // delete cart item
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    // update cart quantity
    const UpdateQuantity = async () => {
        
        if(isUpdating){
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity  //destructuring
            });
            await loadCart();
        }
        setIsUpdating(isUpdating === false ? true : false);
    };

    // get quantity from user
    const getQuantity = (event) => {
        const quantity = Number(event.target.value);
        setQuantity(quantity);
    };
   
    // keyboard events
    const keyboardEvent = (event) => {
        
        if(event.key === 'Enter'){
            const UpdateQuantity = async () => {
                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                    quantity
                });
                await loadCart();
                setIsUpdating(false);
            }
            UpdateQuantity();
        }

        if(event.key === 'Escape'){
            setIsUpdating(false);
        }

    };

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdating && <input type="text" value={quantity} onChange={getQuantity} onKeyDown={keyboardEvent} className="update-quantity" />} 
                        {isUpdating || <span className="quantity-label">{cartItem.quantity}</span>}
                    </span>
                    <span className="update-quantity-link link-primary" onClick={UpdateQuantity}>
                        {isUpdating === false ? 'Update' : 'Save'}
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>

    );
}