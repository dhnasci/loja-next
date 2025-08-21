import React, { createContext, useState, useContext } from 'react';
import { CartController } from '../controllers/CartController';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';

interface CartContextProps {
    controller: CartController;
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    subtotal: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const controller = new CartController();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        controller.addToCart(product);
        setCartItems([...controller.getCartItems()]);
    };

    const removeFromCart = (id: string) => {
        controller.removeFromCart(id);
        setCartItems([...controller.getCartItems()]);
    };

    const subtotal = controller.getSubtotal();

    return (
        <CartContext.Provider value={{
        controller,
            cartItems,
            addToCart,
            removeFromCart,
            subtotal
    }}>
    {children}
    </CartContext.Provider>
);
};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}