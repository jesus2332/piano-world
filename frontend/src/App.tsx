import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router';
import Header from "./components/Header"; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import MyAccountPage from './pages/MyAccountPage'; 
import { useAuth } from './hooks/useAuth';
import { useCartContext } from './contexts/CartContext';
function MainLayout() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCartContext(); 

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
        <Outlet /> 
      </main>
      <footer className="bg-dark mt-5 py-5 ">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Pianoworld - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center py-5">Cargando autenticación...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function GuestRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center py-5">Cargando autenticación...</p>;
  }

  if (user) {
    return <Navigate to="/mi-cuenta" replace />; 
  }

  return children;
}


function App() {
  const { isLoading: authIsLoading } = useAuth();

  if (authIsLoading) {
      return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <h2>Cargando aplicación...</h2>
          </div>
      )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route
            path="/mi-cuenta"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;