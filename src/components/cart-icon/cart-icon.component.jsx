import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const { setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleHandler = () => {
        setIsCartOpen(prevState => !prevState);
    }

    return (
        <div className='cart-icon-container' onClick={toggleHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;