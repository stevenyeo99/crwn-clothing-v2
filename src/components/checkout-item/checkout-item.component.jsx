import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {

    const { decrementItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const { id, imageUrl, name, quantity, price } = cartItem;

    const decrementItemHandler = (id) => {
        decrementItemFromCart(id);
    }

    const incrementItemHandler = (cartItem) => {
        addItemToCart(cartItem);
    }

    const removeItemHandler = (id) => {
        removeItemFromCart(id);
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>

            <span className='name'>{name}</span>

            <div className='quantity'>
                <div className='arrow' onClick={() => decrementItemHandler(id)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => incrementItemHandler(cartItem)}>&#10095;</div>
            </div>

            <span className='price'>${price}</span>

            <div className='remove-button'>
                <span onClick={() => removeItemHandler(id)}>&#10005;</span>    
            </div>
        </div>
    );
};

export default CheckoutItem;