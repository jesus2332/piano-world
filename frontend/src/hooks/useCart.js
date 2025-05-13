import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'



export const useCart = () => {
    const initialCart = () => {
            const localStorageCart = localStorage.getItem('cart')
            return localStorageCart ? JSON.parse(localStorageCart) : []
        }
        
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
      const MAX_ITEMS = 5
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
    
      function addToCart(item){
        const itemExists = cart.findIndex((keyboard) => keyboard.id === item.id)
        if(itemExists >= 0 ){
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart] 
            updatedCart[itemExists].quantity += 1
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
      }
      function removeFromCart(id){
        setCart(prevCart => prevCart.filter(keyboard => keyboard.id !== id))
      }
    
      function increaseQuantity(id){
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
      function decreaseQuantity(id){
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
    
      function clearCart(e){
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
