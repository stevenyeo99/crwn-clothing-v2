import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    
    if (existingCartItem) {
        return cartItems.map(item => {
            return item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : { ...item };
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, productIdToRemove) => {
    return cartItems.filter(item => item.id !== productIdToRemove);
};

const decrementItemQuantity = (cartItems, productIdDecrement) => {
    const productIndex = cartItems.findIndex(item => item.id === productIdDecrement);
    const count = cartItems[productIndex].quantity - 1;

    if (count <= 0) {
        return cartItems.filter(item => item.id !== productIdDecrement);
    }

    return cartItems.map(item => {
        return item.id === productIdDecrement ? { ...item, quantity: item.quantity - 1 } : {...item};
    });
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalPrice: 0,
    removeItemFromCart: () => {},
    decrementItemFromCart: () => {}
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartCounting = cartItems.reduce((totalNumber, currentItem) => {
            return totalNumber + currentItem.quantity;
        }, 0);

        setCartCount(cartCounting);
    }, [cartItems]);

    useEffect(() => {
        const subtotal = cartItems.reduce((totalPrice, currentItem) => {
            return totalPrice + (currentItem.quantity * currentItem.price)
        }, 0);

        setTotalPrice(subtotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productIdToRemove) => {
        setCartItems(removeCartItem(cartItems, productIdToRemove));
    }

    const decrementItemFromCart = (productIdDecrement) => {
        setCartItems(decrementItemQuantity(cartItems, productIdDecrement));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        totalPrice,
        removeItemFromCart,
        decrementItemFromCart
    };

    return (
        <CartContext.Provider value={value}>
            {
                children
            }
        </CartContext.Provider>
    )
};