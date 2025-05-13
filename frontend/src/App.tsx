import Keyboard from "./components/Keyboard"
import Header from "./components/Header"
import { useCart } from './hooks/useCart'
function App() {

  const {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } =
   useCart()

  
 

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal} 

    />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((keyboard) =>{
            return (
              <Keyboard
                key={keyboard.id}
                keyboard={keyboard}
                addToCart={addToCart}
              
              />

            )
          })}
           

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Pianoworld - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}
export default App
