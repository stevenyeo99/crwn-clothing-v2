import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.util";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0
};

const cartReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, totalPrice} = state;

    const updateCartItemsReducer = (newCartItems) => {
        const cartCounting = newCartItems.reduce((totalNumber, currentItem) => {
            return totalNumber + currentItem.quantity;
        }, 0);

        const subtotal = newCartItems.reduce((totalPrice, currentItem) => {
            return totalPrice + (currentItem.quantity * currentItem.price)
        }, 0);

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: cartCounting,
                    totalPrice: subtotal
                }
            )
        );
    };

    const setIsCartOpen = () => {
        dispatch(
            createAction(
                CART_ACTION_TYPES.TOGGLE_CART_OPEN,
                !isCartOpen
            )
        );
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productIdToRemove) => {
        const newCartItems = removeCartItem(cartItems, productIdToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const decrementItemFromCart = (productIdDecrement) => {
        const newCartItems = decrementItemQuantity(cartItems, productIdDecrement);
        updateCartItemsReducer(newCartItems);
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