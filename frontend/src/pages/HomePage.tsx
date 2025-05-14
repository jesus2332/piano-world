// frontend/src/pages/HomePage.tsx
import Keyboard from "../components/Keyboard"; 
import { useCartContext } from '../contexts/CartContext';   

function HomePage() {
  const { data, addToCart } = useCartContext(); 

  return (
    <>
      <h2 className="text-center">Nuestra Colección</h2>
      <div className="row mt-5">
        {data.length === 0 && <p className="text-center">Cargando pianos...</p>}
        {data.map((keyboard) => {
          return (
            <Keyboard
              key={keyboard.id}
              keyboard={keyboard}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </>
  );
}

export default HomePage;