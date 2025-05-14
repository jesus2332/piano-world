/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/components/Header.tsx
import type { Keyboard, CartItem } from "../types";
import { useAuth } from '../hooks/useAuth'; 
import { Link, useNavigate } from 'react-router'; 
import apiClient from "../services/api"; 
//import { useCart } from "../hooks/useCart"; 

type HeaderProps = {
    cart: CartItem[]
    removeFromCart: (id: Keyboard['id']) => void
    increaseQuantity: (id: Keyboard['id']) => void
    decreaseQuantity: (id: Keyboard['id']) => void
    clearCart: () => void
    isEmpty: boolean
    cartTotal: number
}

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: HeaderProps) {
    const { user, logout, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); 
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert("Por favor, inicia sesión para realizar un pedido.");
            navigate('/login');
            return;
        }
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        try {
            const orderData = {
                cart: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            };
            const response = await apiClient.post('/orders', orderData);
            alert('Pedido realizado con éxito! ID del Pedido: ' + response.data.order.id);
            clearCart(); 
            navigate('/mi-cuenta');
        } catch (error: any) {
            console.error('Error placing order:', error);
            alert('Error al realizar el pedido: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between align-items-center">
                    <div className="col-8 col-md-3">
                        <Link to="/">
                            <img className="img-fluid" src="/img/piano_logo.png" alt="imagen logo" />
                        </Link>
                    </div>
                    <nav className="col-md-9 mt-3 mt-md-0 d-flex flex-column flex-md-row align-items-center justify-content-md-end">
                        {/* Menú de Navegación y Autenticación */}
                        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-3">
                            <Link to="/" className="text-white me-3 text-decoration-none">Inicio</Link>
                            {authLoading ? (
                                <span className="text-white">Cargando...</span>
                            ) : user ? (
                                <>
                                    <Link to="/mi-cuenta" className="text-white me-3 text-decoration-none">Mi cuenta</Link>
                                    <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Cerrar Sesión</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-sm btn-outline-light me-2">Iniciar Sesión</Link>
                                    <Link to="/register" className="btn btn-sm btn-light">Registrarse</Link>
                                </>
                            )}
                        </div>

                        {/* Carrito */}
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center m-0">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(keyboard => (
                                                    <tr key={keyboard.id}>
                                                        <td>
                                                            <img className="img-fluid" style={{width: '50px'}} src={`/img/${keyboard.image}.jpg`} alt="imagen piano" />
                                                        </td>
                                                        <td>{keyboard.name}</td>
                                                        <td className="fw-bold">${keyboard.price}</td>
                                                        <td className="d-flex align-items-center gap-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark btn-sm"
                                                                onClick={() => decreaseQuantity(keyboard.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {keyboard.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark btn-sm"
                                                                onClick={() => increaseQuantity(keyboard.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                type="button"
                                                                onClick={() => removeFromCart(keyboard.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end mt-2 mb-1">Total pagar: <span className="fw-bold">${cartTotal.toFixed(2)}</span></p>
                                        <button className="btn btn-outline-danger w-100 mt-2" onClick={clearCart}>
                                            Vaciar Carrito
                                        </button>
                                        {user && !isEmpty && (
                                             <button
                                                className="btn btn-primary w-100 mt-2"
                                                onClick={handlePlaceOrder}
                                             >
                                                Realizar Pedido
                                            </button>
                                        )}
                                        {!user && !isEmpty && (
                                            <Link to="/login" className="btn btn-warning w-100 mt-2">
                                                Inicia sesión para pedir
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}