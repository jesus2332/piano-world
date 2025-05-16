// frontend/src/hooks/useCart.ts
import { useState, useEffect, useMemo, useCallback } from 'react'; 
import apiClient from '../services/api';
import type { Keyboard, CartItem } from '../types';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data, setData] = useState<Keyboard[]>([]);
    const [cart, setCart] = useState(initialCart);

    const fetchPianos = useCallback(async () => {
        console.log("Fetching pianos data from useCart..."); 
        try {
            const response = await apiClient.get<Keyboard[]>('/pianos');
            const sortedData = response.data.sort((a, b) => a.id - b.id);
            setData(sortedData);
        } catch (error) {
            console.error('Error fetching pianos:', error);
        }
    }, []); 

    useEffect(() => {
        fetchPianos(); 
    }, [fetchPianos]); 

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item: Keyboard) {
        if (item.stock === 0) {
            console.warn("Intentando agregar item sin stock:", item.name);
            alert(`Lo sentimos, ${item.name} está fuera de stock.`);
            return;
        }

        const itemExistsIndex = cart.findIndex(keyboard => keyboard.id === item.id);

        if (itemExistsIndex >= 0) {
            const currentCartItem = cart[itemExistsIndex];
            if (currentCartItem.quantity >= item.stock) {
                alert(`No puedes agregar más unidades de ${item.name}. Stock máximo alcanzado en el carrito.`);
                return;
            }
            const updatedCart = cart.map((cartItem, index) => {
                if (index === itemExistsIndex) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart);
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }

    function removeFromCart(id: Keyboard['id']) {
        setCart(prevCart => prevCart.filter(keyboard => keyboard.id !== id));
    }

    function increaseQuantity(id: Keyboard['id']) {
        const itemInCart = cart.find(item => item.id === id);
        const originalItemData = data.find(item => item.id === id);

        if (!itemInCart || !originalItemData) return;

        if (itemInCart.quantity < originalItemData.stock) {
            const updatedCart = cart.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
            setCart(updatedCart);
        } else {
            alert(`No puedes agregar más unidades de ${originalItemData.name}. Stock máximo alcanzado.`);
        }
    }

    function decreaseQuantity(id: Keyboard['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
        refetchPianos: fetchPianos 
    };
};