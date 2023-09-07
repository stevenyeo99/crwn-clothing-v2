import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleHandler = () => {
        setIsCartOpen(prevState => !prevState);
    }

    return (
        <CartIconContainer onClick={toggleHandler}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;