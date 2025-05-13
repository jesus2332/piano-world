import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Keyboard, CartItem } from '../types'


export const useCart = () => {
    const initialCart = () : CartItem[]=> {
            const localStorageCart = localStorage.getItem('cart')
            return localStorageCart ? JSON.parse(localStorageCart) : []
        }
        
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
      const MAX_ITEMS = 5
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
    
      function addToCart(item: Keyboard){
        const itemExists = cart.findIndex(keyboard => keyboard.id === item.id)
        if(itemExists >= 0 ){
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart] 
            updatedCart[itemExists].quantity += 1
            setCart(updatedCart)
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
