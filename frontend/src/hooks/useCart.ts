import { useState, useEffect, useMemo } from 'react'
import apiClient from '../services/api'
import type { Keyboard, CartItem } from '../types'


export const useCart = () => {
    const initialCart = () : CartItem[]=> {
            const localStorageCart = localStorage.getItem('cart')
            return localStorageCart ? JSON.parse(localStorageCart) : []
        }
        

        
      const [data, setData] = useState<Keyboard[]>([])
      const [cart, setCart] = useState(initialCart)
      const MAX_ITEMS = 5
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])

      
      useEffect(() => {
        apiClient.get<Keyboard[]>('/pianos')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching pianos:', error));
    }, []);
    
    
      function addToCart(item: Keyboard){
        const itemExists = cart.findIndex(keyboard => keyboard.id === item.id)
        if(itemExists >= 0 ){
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = cart.map((cartItem, index) => {
              if (index === itemExists) {
                  return { ...cartItem, quantity: cartItem.quantity + 1 }; 
              }
              return cartItem;
          });
          setCart(updatedCart);
        }else{
            const newItem: CartItem = {...item, quantity: 1}
            setCart([...cart, newItem])
        }
      }

      function removeFromCart(id: Keyboard['id']){
        setCart(prevCart => prevCart.filter(keyboard => keyboard.id !== id))
      }
    
      function increaseQuantity(id : Keyboard['id']){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
      function decreaseQuantity(id: Keyboard['id']){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > 1){
                return{
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item
        })
        setCart(updatedCart)
    
      }
    
      function clearCart(){
        setCart([])
      }
      const isEmpty = useMemo(() => cart.length === 0, [cart])

      const  cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity),0),  [cart])
  
    



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal

    }

    

}
