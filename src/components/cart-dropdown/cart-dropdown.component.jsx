import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const redirectToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(item => {
                        return <CartItem key={item.id} cartItem={item} />
                    })
                }
            </div>
            <Button onClick={redirectToCheckout}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;