// frontend/src/contexts/CartContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useCart as useCartHook } from '../hooks/useCart'; 
import type { Keyboard, CartItem } from '../types';

interface CartContextType {
    data: Keyboard[];
    cart: CartItem[];
    addToCart: (item: Keyboard) => void;
    removeFromCart: (id: Keyboard['id']) => void;
    increaseQuantity: (id: Keyboard['id']) => void;
    decreaseQuantity: (id: Keyboard['id']) => void;
    clearCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const cartLogic = useCartHook(); 

    return (
        <CartContext.Provider value={cartLogic}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};