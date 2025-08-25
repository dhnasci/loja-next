import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartController } from '../controllers/CartController';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (product: Product) => Promise<void>;
    subtotal: number;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const controller = new CartController();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        refreshCart();
    }, []);

    const refreshCart = async () => {
        try {
            const itens = await controller.getCartItems();
            setCartItems(itens);
        } catch (_) {
            setCartItems([]);
        }
    };

    const addToCart = async (product: Product) => {
        await controller.addToCart(product);
        await refreshCart();
    };

    const removeFromCart = async (product: Product) => {
        await controller.removeFromCart(product);
        await refreshCart();
    };

    const subtotal = CartController.computeSubtotal(cartItems);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            subtotal,
            refreshCart
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